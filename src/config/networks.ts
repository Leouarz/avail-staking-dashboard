// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import AvailTokenSVG from 'config/tokens/svg/AVL.svg?react';
import AvailLogo from 'img/avail_logo.svg?react';

import type { NetworkName, Networks } from 'types';
import BigNumber from 'bignumber.js';

// DEPRECATION: Paged Rewards
//
// Temporary until paged rewards migration has completed on all networks.
export const NetworksWithPagedRewards: NetworkName[] = [];
export const PagedRewardsStartEra: Record<NetworkName, BigNumber | null> = {
  avail: null,
  'avail-turing': null,
  'avail-goldberg': null,
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
  // avail: {
  //   name: 'avail',
  //   endpoints: {
  //     lightClient: '',
  //     defaultRpcEndpoint: 'Avail RPC',
  //     rpcEndpoints: {
  //       'Avail RPC': 'wss://rpc-hex-devnet.avail.tools/ws',
  //     },
  //   },
  //   namespace: 'Avail mainnet',
  //   colors,
  //   unit: 'AVAIL',
  //   units: 18,
  //   ss58: 42,
  //   brand,
  //   api: {
  //     unit: 'AVAIL',
  //     priceTicker: 'AVAILUSDT',
  //   },
  //   defaultFeeReserve: 0.1,
  //   maxExposurePageSize: new BigNumber(64),
  //   subscanPrefix: undefined,
  // },
  'avail-turing': {
    name: 'avail-turing',
    endpoints: {
      lightClient: '',
      defaultRpcEndpoint: 'Avail Turing RPC',
      rpcEndpoints: {
        'Avail Turing RPC': 'wss://turing-rpc.avail.so/ws',
      },
    },
    namespace: 'Avail turing',
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
    subscanPrefix: undefined,
  },
  'avail-goldberg': {
    name: 'avail-goldberg',
    endpoints: {
      lightClient: '',
      defaultRpcEndpoint: 'Avail Goldberg RPC',
      rpcEndpoints: {
        'Avail Goldberg RPC': 'wss://rpc-testnet.avail.tools/ws',
      },
    },
    namespace: 'Avail goldberg testnet',
    colors,
    unit: 'AVL',
    units: 18,
    ss58: 42,
    brand,
    api: {
      unit: 'AVL',
      priceTicker: 'AVLUSDT',
    },
    defaultFeeReserve: 0.1,
    maxExposurePageSize: new BigNumber(64),
    subscanPrefix: 'avail-testnet',
  },
};
