// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

import { NetworkList } from 'config/networks';

export const defaultNetworkContext = {
  network: NetworkList['avail'].name,
  networkData: NetworkList['avail'],
  switchNetwork: () => {},
};

export const defaultNetwork = 'avail';
