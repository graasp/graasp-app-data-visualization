import React from 'react';

import AccessChart from './containers/AccessChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';

const AccessWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <AccessChart />
      <KeyedDatePicker id="AccessChart" initialValue={initialState} />
    </div>
  );
};

export default AccessWidget;
