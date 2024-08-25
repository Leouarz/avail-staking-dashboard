// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import AvailTokenSVG from 'config/tokens/svg/AVL.svg?react';
import AvailLogo from 'img/avail_logo.svg?react';

import type { Networks, SystemChain } from 'types';
import BigNumber from 'bignumber.js';

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
  'avail-turing-testnet': {
    name: 'avail-turing-testnet',
    endpoints: {
      lightClient: '',
      defaultRpcEndpoint: 'Avail Turing RPC',
      rpcEndpoints: {
        'Avail Turing RPC': 'wss://turing-rpc.avail.so/ws',
      },
    },
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

export const SystemChainList: Record<string, SystemChain> = {
  'people-polkadot': {
    name: 'people-polkadot',
    ss58: 0,
    units: 10,
    unit: 'DOT',
    endpoints: {
      lightClient: 'people_polkadot', // NOTE: Currently not being used. TODO: Revise this and activate once People chain specs are available to use.
      rpcEndpoints: {
        Parity: 'wss://polkadot-people-rpc.polkadot.io',
      },
    },
  },
  'people-kusama': {
    name: 'people-kusama',
    ss58: 2,
    units: 12,
    unit: 'KSM',
    endpoints: {
      lightClient: 'people_kusama', // NOTE: Currently not being used. TODO: Revise this and activate once People chain specs are available to use.
      rpcEndpoints: {
        Parity: 'wss://kusama-people-rpc.polkadot.io',
      },
    },
  },
  'people-westend': {
    name: 'people-westend',
    ss58: 42,
    units: 12,
    unit: 'WND',
    endpoints: {
      lightClient: 'people_westend', // NOTE: Currently not being used. TODO: Revise this and activate once People chain specs are available to use.
      rpcEndpoints: {
        Parity: 'wss://westend-people-rpc.polkadot.io',
      },
    },
  },
};
