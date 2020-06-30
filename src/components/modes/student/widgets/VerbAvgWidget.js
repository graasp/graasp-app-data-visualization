import React from 'react';
import VerbAvgChart from './containers/VerbAvgChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import Legend from '../../../common/Legend';
import { VERB_BAR_DATE_PICKER_ID, VERB_BAR_LEGEND_ID } from './types/types';

const VerbAvgWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <Legend id={VERB_BAR_LEGEND_ID} />
      <VerbAvgChart />
      <KeyedDatePicker
        id={VERB_BAR_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

export default VerbAvgWidget;
