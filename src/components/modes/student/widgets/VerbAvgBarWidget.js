import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { VERB_BAR_AVG_LEGEND_ID, VERB_BAR_DATE_PICKER_ID } from './types';
import VerbAvgChart from './containers/VerbAvgChart';
import Legend from '../../../common/Legend';

function VerbAvgBarWidget() {
  return (
    <div>
      <Legend id={VERB_BAR_AVG_LEGEND_ID} />
      <VerbAvgChart />
      <KeyedDatePicker id={VERB_BAR_DATE_PICKER_ID} />
    </div>
  );
}

export default VerbAvgBarWidget;
