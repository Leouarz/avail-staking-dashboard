// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { DefaultParams } from 'consts';
import AvailTokenSVG from 'config/tokens/svg/AVL.svg?react';
import AvailLogo from 'img/avail_logo.svg?react';

import type { Networks } from 'types';

export const NetworkList: Networks = {
  avail: {
    name: 'avail',
    endpoints: {
      lightClient: null,
      defaultRpcEndpoint: 'Avail RPC',
      rpcEndpoints: {
        'Avail RPC': 'wss://goldberg.avail.tools/ws',
      },
    },
    namespace: 'Avail goldberg testnet',
    colors: {
      primary: {
        light: 'rgb(60, 163, 252)',
        dark: 'rgb(60, 163, 252)',
      },
      secondary: {
        light: '#552bbf',
        dark: '#6d39ee',
      },
      stroke: {
        light: 'rgb(60, 163, 252)',
        dark: 'rgb(60, 163, 252)',
      },
      transparent: {
        light: 'rgb(60, 163, 252, 0.05)',
        dark: 'rgb(60, 163, 252, 0.05)',
      },
      pending: {
        light: 'rgb(60, 163, 252, 0.33)',
        dark: 'rgb(60, 163, 252, 0.33)',
      },
    },
    subscanEndpoint: 'https://subscan.goldberg.avail.tools',
    unit: 'AVL',
    units: 18,
    ss58: 42,
    brand: {
      icon: AvailTokenSVG,
      token: AvailTokenSVG,
      logo: {
        svg: AvailLogo,
        width: '7.2em',
      },
      inline: {
        svg: AvailTokenSVG,
        size: '1.05em',
      },
    },
    api: {
      unit: 'AVL',
      priceTicker: 'AVLUSDT',
    },
    params: {
      ...DefaultParams,
      stakeTarget: 0.5,
    },
    defaultFeeReserve: 0.1,
  },
};
