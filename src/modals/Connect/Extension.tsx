// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import {
  faExternalLinkAlt,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNetwork } from 'contexts/Network';
import { useTranslation } from 'react-i18next';
import { ExtensionIcons } from '@w3ux/extension-assets/util';
import { ExtensionInner } from './Wrappers';
import type { ExtensionProps } from './types';
import { NotificationsController } from 'controllers/NotificationsController';
import { ModalConnectItem } from 'kits/Overlay/structure/ModalConnectItem';
import { useExtensionAccounts, useExtensions } from '@w3ux/react-connect-kit';
import { localStorageOrDefault } from '@w3ux/utils';
import {
  initialize,
  MAINNET_ENDPOINT,
  types,
  signedExtensions,
  TURING_ENDPOINT,
} from 'avail-js-sdk';
import type { ApiPromise } from 'avail-js-sdk';
import { BinanceKey, DappName } from 'consts';

export const Extension = ({ meta, size, flag }: ExtensionProps) => {
  const { t } = useTranslation('modals');
  const { connectExtensionAccounts } = useExtensionAccounts();
  const { extensionsStatus, extensionInstalled, extensionCanConnect } =
    useExtensions();
  const { network } = useNetwork();
  const { title, website, id } = meta;
  const isInstalled = extensionInstalled(id);
  const canConnect = extensionCanConnect(id);

  // Whether the app is running in a Binance web3 wallet  Mobile.
  const inBinance =
    !!window.injectedWeb3?.[BinanceKey] &&
    Boolean((window as any).ethereum?.isBinance);

  // Force re-render on click.
  const [increment, setIncrement] = useState<number>(0);

  const connected = extensionsStatus[id] === 'connected';

  const setupSignedExtensionMetadata = async () => {
    const getInjectorMetadata = async (
      api: ApiPromise,
      specVersion: number
    ) => ({
      chain: api.runtimeChain.toString(),
      specVersion,
      tokenDecimals: api.registry.chainDecimals[0] || 18,
      tokenSymbol: api.registry.chainTokens[0] || 'AVAIL',
      genesisHash: api.genesisHash.toHex(),
      ss58Format: api.registry.chainSS58 || 0,
      chainType: 'substrate' as const,
      icon: 'substrate',
      types: types as any,
      userExtensions: signedExtensions,
    });
    if (
      ['polkadot-js', 'subwallet-js', 'talisman', BinanceKey].includes(id) &&
      network.includes('avail')
    ) {
      const api = await initialize(
        network.includes('turing') ? TURING_ENDPOINT : MAINNET_ENDPOINT
      );
      const specVersion = api.runtimeVersion.specVersion.toNumber();
      const key = `avail-metadata-${network}-${id}`;
      let savedMetadataSpecVersion = localStorage.getItem(key);
      if (
        savedMetadataSpecVersion &&
        Number(savedMetadataSpecVersion) !== specVersion
      ) {
        localStorage.removeItem(key);
        savedMetadataSpecVersion = null;
      }

      const alreadyInitialized = savedMetadataSpecVersion !== null;
      if (!alreadyInitialized) {
        const { web3FromSource, web3Enable } = await import(
          '@polkagate/extension-dapp'
        );
        await web3Enable(DappName);
        const injector = await web3FromSource(id);
        if (injector.metadata) {
          const metadata = await getInjectorMetadata(api, specVersion);
          injector.metadata.provide(metadata);
          localStorage.setItem(key, specVersion.toString());
        }
      }
    }
  };

  // Click to connect to extension.
  const handleClick = async () => {
    if (!inBinance) {
      if (!connected) {
        if (canConnect) {
          const success = await connectExtensionAccounts(id);
          await setupSignedExtensionMetadata();

          // force re-render to display error messages
          setIncrement(increment + 1);

          if (success) {
            NotificationsController.emit({
              title: t('extensionConnected'),
              subtitle: `${t('titleExtensionConnected', { title: inBinance ? 'Binance Wallet' : title })}`,
            });
          }
        }
      } else {
        if (confirm(t('disconnectFromExtension'))) {
          const updatedAtiveExtensions = (
            localStorageOrDefault('active_extensions', [], true) as string[]
          ).filter((ext: string) => ext !== id);

          localStorage.setItem(
            'active_extensions',
            JSON.stringify(updatedAtiveExtensions)
          );
          location.reload();
        }
      }
    }
  };

  // Get the correct icon id for the extension.
  const iconId =
    window?.walletExtension?.isNovaWallet && id === 'polkadot-js'
      ? 'nova-wallet'
      : id;
  const Icon = ExtensionIcons[iconId];

  // Determine message to be displayed based on extension status.
  let statusJsx;
  switch (extensionsStatus[id]) {
    case 'connected':
      statusJsx = (
        <p className="active">
          <FontAwesomeIcon icon={faMinus} className="plus" />
          {t('disconnect')}
        </p>
      );
      break;

    case 'not_authenticated':
      statusJsx = <p>{t('notAuthenticated')}</p>;
      break;

    default:
      statusJsx = (
        <p className="active">
          <FontAwesomeIcon icon={faPlus} className="plus" />
          {t('connect')}
        </p>
      );
  }

  console.log({ statusJsx });

  const websiteText = typeof website === 'string' ? website : website.text;
  const websiteUrl = typeof website === 'string' ? website : website.url;
  const disabled = !isInstalled || (inBinance && network.includes('turing'));

  return (
    <ModalConnectItem canConnect={canConnect}>
      <ExtensionInner>
        <div>
          <div className="body">
            {!disabled ? (
              <button
                type="button"
                className="button"
                onClick={() => handleClick()}
              >
                &nbsp;
              </button>
            ) : null}

            <div className="row icon">
              {Icon && !inBinance && (
                <Icon style={{ width: size, height: size }} />
              )}
              {inBinance && (
                <svg
                  version="1.1"
                  id="Your_design"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="126.611px"
                  height="126.611px"
                  viewBox="0 0 126.611 126.611"
                  enableBackground="new 0 0 126.611 126.611"
                  style={{ width: size, height: size }}
                >
                  <polygon
                    fill="#F3BA2F"
                    points="38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896 "
                  />
                  <rect
                    x="3.644"
                    y="53.188"
                    transform="matrix(0.7071 0.7071 -0.7071 0.7071 48.7933 8.8106)"
                    fill="#F3BA2F"
                    width="20.233"
                    height="20.234"
                  />
                  <polygon
                    fill="#F3BA2F"
                    points="38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.611 
                    23.863,87.716 23.843,87.696 "
                  />
                  <rect
                    x="101.64"
                    y="53.189"
                    transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 235.5457 29.0503)"
                    fill="#F3BA2F"
                    width="20.234"
                    height="20.233"
                  />
                  <polygon
                    fill="#F3BA2F"
                    points="77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.285 
                    48.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305 "
                  />
                </svg>
              )}
            </div>
            <div className="status">
              {flag && flag}
              {!inBinance &&
                (isInstalled ? statusJsx : <p>{t('notInstalled')}</p>)}
            </div>
            <div className="row">
              <h3>{inBinance ? 'Binance web3 wallet' : title}</h3>
              {inBinance && <p className="active inline">{t('connected')}</p>}
              {!inBinance && connected && (
                <p className="active inline">{t('connected')}</p>
              )}
            </div>
          </div>
          <div className="foot">
            <a
              className="link"
              href={`https://${inBinance ? 'binance.com/web3wallet' : websiteUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              {inBinance ? 'binance.com/web3wallet' : websiteText}
              <FontAwesomeIcon icon={faExternalLinkAlt} transform="shrink-6" />
            </a>
          </div>
        </div>
      </ExtensionInner>
    </ModalConnectItem>
  );
};
