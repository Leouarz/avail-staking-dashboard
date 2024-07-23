// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import AvailTokenSVG from 'config/tokens/svg/AVL.svg?react';
import AvailLogo from 'img/avail_logo.svg?react';

import type { NetworkName, Networks } from 'types';
import BigNumber from 'bignumber.js';

// DEPRECATION: Paged Rewards
//
// Temporary until paged rewards migration has completed on all networks.
export const NetworksWithPagedRewards: NetworkName[] = [
  'avail',
  'avail-turing',
];
export const PagedRewardsStartEra: Record<NetworkName, BigNumber | null> = {
  avail: new BigNumber(0),
  'avail-turing': new BigNumber(0),
};

const colors = {
  primary: {
    light: 'rgb(60, 163, 252)',
    dark: 'rgb(60, 163, 252)',
  },
  secondary: {
    light: '#dedae8',
    dark: '#dedae8',
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
};

const brand = {
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
};

export const NetworkList: Networks = {
  avail: {
    name: 'avail',
    endpoints: {
      lightClient: '',
      defaultRpcEndpoint: 'Avail RPC',
      rpcEndpoints: {
        'Avail RPC': 'wss://mainnet-rpc.avail.so/ws',
      },
    },
    namespace: 'Avail',
    colors,
    unit: 'AVAIL',
    units: 18,
    ss58: 42,
    brand,
    api: {
      unit: 'AVAIL',
      priceTicker: 'AVAILUSDT',
    },
    defaultFeeReserve: 0.1,
    maxExposurePageSize: new BigNumber(64),
    subscanPrefix: 'avail',
  },
  'avail-turing': {
    name: 'avail-turing',
    endpoints: {
      lightClient: '',
      defaultRpcEndpoint: 'Avail Turing RPC',
      rpcEndpoints: {
        'Avail Turing RPC': 'wss://turing-rpc.avail.so/ws',
      },
    },
    namespace: 'Avail turing testnet',
    colors,
    unit: 'AVAIL',
    units: 18,
    ss58: 42,
    brand,
    api: {
      unit: 'AVAIL',
      priceTicker: 'AVAILUSDT',
    },
    defaultFeeReserve: 0.1,
    maxExposurePageSize: new BigNumber(64),
    subscanPrefix: 'avail-turing',
  },
};
