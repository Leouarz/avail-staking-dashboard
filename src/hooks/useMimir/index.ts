// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { injectMimirIfNecessary } from 'mimir';
import { useEffect } from 'react';

export const useInjectMimir = () => {
  useEffect(() => {
    injectMimirIfNecessary();
  }, []);
};
