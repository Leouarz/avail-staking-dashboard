// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { LedgerApp } from 'contexts/LedgerHardware/types';
import AvailSVG from 'img/appIcons/avail.svg?react';

export const LedgerApps: LedgerApp[] = [
  {
    network: 'avail',
    appName: 'Avail',
    Icon: AvailSVG,
  },
  {
    network: 'avail-turing-testnet',
    appName: 'Avail',
    Icon: AvailSVG,
  },
];
