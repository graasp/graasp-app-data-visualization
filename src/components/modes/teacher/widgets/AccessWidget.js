import React from 'react';

import AccessChart from './containers/AccessChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';

const AccessWidget = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <AccessChart />
      <KeyedDatePicker id="AccessChart" initialValue={initialState} />
    </div>
  );
};

export default AccessWidget;
