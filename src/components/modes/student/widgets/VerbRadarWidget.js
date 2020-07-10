import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import VerbRadarChart from './containers/VerbRadarChart';
import { VERB_RADAR_DATE_PICKER_ID } from './types';

const VerbAvgWidget = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
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
