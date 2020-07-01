import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { VERB_AVG_BAR_DATE_PICKER_ID, VERB_BAR_AVG_LEGEND_ID } from './types';
import VerbAvgChart from './containers/VerbAvgChart';
import Legend from '../../../common/Legend';

const VerbAvgBarWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <Legend id={VERB_BAR_AVG_LEGEND_ID} />
      <VerbAvgChart />
      <KeyedDatePicker
        id={VERB_AVG_BAR_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

export default VerbAvgBarWidget;
