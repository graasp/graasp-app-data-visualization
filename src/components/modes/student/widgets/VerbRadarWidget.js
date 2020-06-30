import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import VerbRadarChart from './containers/VerbRadarChart';
import { VERB_RADAR_DATE_PICKER_ID } from './types/types';

const VerbAvgWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <VerbRadarChart />
      <KeyedDatePicker
        id={VERB_RADAR_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

export default VerbAvgWidget;
