// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { greaterThanZero } from '@w3ux/utils';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Pie } from 'library/StatBoxList/Pie';
import { useApi } from 'contexts/Api';

export const TotalValidatorsStat = () => {
  const { t } = useTranslation('pages');
  const {
    stakingMetrics: { totalValidators, maxValidatorsCount },
  } = useApi();

  let maxValidatorsCountToUse = new BigNumber(maxValidatorsCount);
  if (maxValidatorsCountToUse.isNaN()) {
    maxValidatorsCountToUse = new BigNumber(1500);
  }

  // total validators as percent
  let totalValidatorsAsPercent = 0;
  if (greaterThanZero(maxValidatorsCountToUse)) {
    totalValidatorsAsPercent = totalValidators
      .div(maxValidatorsCountToUse.dividedBy(100))
      .toNumber();
  }

  const params = {
    label: t('validators.totalValidators'),
    stat: {
      value: totalValidators.toNumber(),
      total: maxValidatorsCountToUse.toNumber(),
      unit: '',
    },
    graph: {
      value1: totalValidators.toNumber(),
      value2: maxValidatorsCountToUse.minus(totalValidators).toNumber(),
    },
    tooltip: `${new BigNumber(totalValidatorsAsPercent)
      .decimalPlaces(2)
      .toFormat()}%`,
    helpKey: 'Validator',
  };
  return <Pie {...params} />;
};
