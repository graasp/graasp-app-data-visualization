import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { VERB_BAR_AVG_LEGEND_ID, VERB_BAR_DATE_PICKER_ID } from './types';
import VerbAvgChart from './containers/VerbAvgChart';
import Legend from '../../../common/Legend';

function VerbAvgBarWidget() {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <Legend id={VERB_BAR_AVG_LEGEND_ID} />
      <VerbAvgChart />
      <KeyedDatePicker
        id={VERB_BAR_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
}

export default VerbAvgBarWidget;
