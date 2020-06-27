import React from 'react';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import VerbRadarChart from './containers/VerbRadarChart';

const VerbAvgWidget = () => {
  const initialState = {
    from: new Date('2019-05-29'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <VerbRadarChart />
      <KeyedDatePicker id="VerbRadarWidget" initialValue={initialState} />
    </div>
  );
};

export default VerbAvgWidget;
