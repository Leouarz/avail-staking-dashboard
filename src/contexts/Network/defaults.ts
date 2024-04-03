// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

import { NetworkList } from 'config/networks';

export const defaultNetworkContext = {
  network: NetworkList['avail-turing'].name,
  networkData: NetworkList['avail-turing'],
  switchNetwork: () => {},
};

export const defaultNetwork = 'avail-turing';
