import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import Legend from '../../../common/Legend';
import { VERB_LINE_DATE_PICKER_ID, VERB_LINE_AVG_LEGEND_ID } from './types';
import VerbLineSumChart from './containers/VerbLineSumChart';

const VerbAvgLineWidget = () => {
  return (
    <div>
      <Legend id={VERB_LINE_AVG_LEGEND_ID} />
      <VerbLineSumChart />
      <KeyedDatePicker id={VERB_LINE_DATE_PICKER_ID} />
    </div>
  );
};

export default VerbAvgLineWidget;
