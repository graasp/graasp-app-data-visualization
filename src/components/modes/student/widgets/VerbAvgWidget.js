import React from 'react';

import VerbAvgChart from './containers/VerbAvgChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';

const VerbAvgWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <VerbAvgChart />
      <KeyedDatePicker id="VerbChart" initialValue={initialState} />
    </div>
  );
};

export default VerbAvgWidget;
