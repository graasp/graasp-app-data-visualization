import React from 'react';

import VerbChart from './containers/VerbChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { VERB_CHART_DATE_PICKER_ID } from './types';

const VerbWidget = () => {
  return (
    <div>
      <VerbChart />
      <KeyedDatePicker id={VERB_CHART_DATE_PICKER_ID} />
    </div>
  );
};

export default VerbWidget;
