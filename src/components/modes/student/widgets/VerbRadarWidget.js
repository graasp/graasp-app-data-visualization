import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import VerbRadarChart from './containers/VerbRadarChart';
import { VERB_RADAR_DATE_PICKER_ID } from './types';

const VerbAvgWidget = () => {
  return (
    <div>
      <VerbRadarChart />
      <KeyedDatePicker id={VERB_RADAR_DATE_PICKER_ID} />
    </div>
  );
};

export default VerbAvgWidget;
