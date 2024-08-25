// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ReactNode } from 'react';
import {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from 'react';

import type { MaybeAddress } from 'types';
import type {
  ExternalAccount,
  ImportedAccount,
} from '@w3ux/react-connect-kit/types';
import { BinanceKey, DappName, ManualSigners } from 'consts';
import { useExtensionAccounts } from '@w3ux/react-connect-kit';
import { useEffectIgnoreInitial } from '@w3ux/hooks';
import { defaultImportedAccountsContext } from './defaults';
import type { ImportedAccountsContextInterface } from './types';
import { useOtherAccounts } from '../OtherAccounts';
import { BalancesController } from 'controllers/Balances';
import { useApi } from 'contexts/Api';
import { useNetwork } from 'contexts/Network';
import { getActiveAccountLocal, getActiveProxyLocal } from '../Utils';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import { isValidAddress } from 'avail-js-sdk';

export const ImportedAccountsContext =
  createContext<ImportedAccountsContextInterface>(
    defaultImportedAccountsContext
  );

export const useImportedAccounts = () => useContext(ImportedAccountsContext);

export const ImportedAccountsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isReady, api } = useApi();
  const {
    network,
    networkData: { ss58 },
  } = useNetwork();
  const { otherAccounts } = useOtherAccounts();
  const { getExtensionAccounts } = useExtensionAccounts();
  const { setActiveAccount, setActiveProxy } = useActiveAccounts();
  const [w3wAccounts, setw3waccounts] = useState<ImportedAccount[]>([]);
  const [w3wAccountsLoaded, setw3waccountsLoaded] = useState(false);

  // Whether the app is running in a Binance web3 wallet  Mobile.
  const inBinance =
    !!window.injectedWeb3?.[BinanceKey] &&
    Boolean((window as any).ethereum?.isBinance);

  useEffect(() => {
    const getAccount = async () => {
      const source = BinanceKey;
      if (inBinance && !!window.injectedWeb3?.[source]) {
        const { web3FromSource, web3Enable } = await import(
          '@polkagate/extension-dapp'
        );
        const extension = await window.injectedWeb3[source].enable(DappName);
        await web3Enable(DappName);
        const accounts = await extension.accounts.get();
        const injector = await web3FromSource(source);
        const signer = injector.signer;
        setw3waccounts(
          accounts
            .filter(
              (x) =>
                isValidAddress(x.address) &&
                (!(x as any).genesisHash ||
                  (x as any).genesisHash ===
                    '0xb91746b45e0346cc2f815a520b9c6cb4d5c0902af848db0a80f85932d2e8276a')
            )
            .map((x) => ({ ...x, source, signer }))
        );
      }
      setw3waccountsLoaded(true);
    };
    getAccount();
  }, [inBinance, typeof window]);

  // Get the imported extension accounts formatted with the current network's ss58 prefix.
  const extensionAccounts = getExtensionAccounts(ss58);

  const allAccounts = w3wAccounts
    .concat(extensionAccounts)
    .concat(otherAccounts);

  // Stringify account addresses and account names to determine if they have changed. Ignore other properties including `signer` and `source`.
  const shallowAccountStringify = (accounts: ImportedAccount[]) => {
    const sorted = accounts.sort((a, b) => {
      if (a.address < b.address) {
        return -1;
      }
      if (a.address > b.address) {
        return 1;
      }
      return 0;
    });
    return JSON.stringify(
      sorted.map((account) => [account.address, account.name])
    );
  };

  const allAccountsStringified = shallowAccountStringify(allAccounts);

  // Gets an account from `allAccounts`.
  //
  // Caches the function when imported accounts update.
  const getAccount = useCallback(
    (who: MaybeAddress) =>
      allAccounts.find(({ address }) => address === who) || null,
    [allAccountsStringified]
  );

  // Checks if an address is a read-only account.
  //
  // Caches the function when imported accounts update.
  const isReadOnlyAccount = useCallback(
    (who: MaybeAddress) => {
      const account = allAccounts.find(({ address }) => address === who) || {};
      if (Object.prototype.hasOwnProperty.call(account, 'addedBy')) {
        const { addedBy } = account as ExternalAccount;
        return addedBy === 'user';
      }
      return false;
    },
    [allAccountsStringified]
  );

  // Checks whether an account can sign transactions.
  //
  // Caches the function when imported accounts update.
  const accountHasSigner = useCallback(
    (address: MaybeAddress) =>
      allAccounts.find(
        (account) =>
          account.address === address && account.source !== 'external'
      ) !== undefined,
    [allAccountsStringified]
  );

  // Checks whether an account needs manual signing.
  //
  // This is the case for accounts imported from hardware wallets, transactions of which cannot be
  // automatically signed by a provided `signer` as is the case with web extensions.
  //
  // Caches the function when imported accounts update.
  const requiresManualSign = useCallback(
    (address: MaybeAddress) =>
      allAccounts.find(
        (a) => a.address === address && ManualSigners.includes(a.source)
      ) !== undefined,
    [allAccountsStringified]
  );

  // Keep accounts in sync with `BalancesController`.
  useEffectIgnoreInitial(() => {
    if (api && isReady) {
      BalancesController.syncAccounts(
        api,
        allAccounts.map((a) => a.address)
      );
    }
  }, [isReady, allAccountsStringified]);

  // Re-sync the active account and active proxy on network change.
  useEffectIgnoreInitial(() => {
    if (w3wAccountsLoaded) {
      const localActiveAccount = getActiveAccountLocal(network, ss58);

      if (getAccount(localActiveAccount) !== null) {
        setActiveAccount(getActiveAccountLocal(network, ss58), false);
      } else {
        setActiveAccount(null, false);
      }

      const localActiveProxy = getActiveProxyLocal(network, ss58);
      if (getAccount(localActiveProxy?.address || null)) {
        setActiveProxy(getActiveProxyLocal(network, ss58), false);
      } else {
        setActiveProxy(null, false);
      }
    }
  }, [network, w3wAccountsLoaded]);

  return (
    <ImportedAccountsContext.Provider
      value={{
        accounts: allAccounts,
        getAccount,
        isReadOnlyAccount,
        accountHasSigner,
        requiresManualSign,
      }}
    >
      {children}
    </ImportedAccountsContext.Provider>
  );
};
