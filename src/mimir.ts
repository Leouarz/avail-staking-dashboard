// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ApiPromise } from '@polkadot/api';
import { MIMIR_REGEXP, inject, isMimirReady } from '@mimirdev/apps-inject';
import extensions from '@w3ux/extension-assets';
import { checkCall } from '@mimirdev/apps-sdk';

export const injectMimirIfNecessary = (): Promise<void> =>
  isMimirReady().then((origin) => {
    (extensions as unknown as any)['mimir'] = {
      features: ['getAccounts', 'signer'],
      title: 'Mimir Wallet',
      category: 'web-extension',
      website: {
        url: 'app.mimir.global',
        text: 'app.mimir.global',
      },
    };
    if (origin) {
      if (MIMIR_REGEXP.test(origin)) {
        inject();
      } else if (process.env.NODE_ENV === 'development') {
        inject();
      }
    }
  });

export const signMimir = async (
  api: ApiPromise,
  signer: any,
  address: string,
  method: any
) => {
  const result = await signer.signPayload({
    address,
    method: method.toHex(),
    genesisHash: api.genesisHash.toHex(),
  });

  const call = api.registry.createType('Call', result.payload.method);

  if (!checkCall(api, call, method)) {
    throw new Error('not safe tx');
  }

  const newTx = api.tx[call.section][call.method](...call.args);

  newTx.addSignature(result.signer, result.signature, result.payload);

  return newTx;
};
