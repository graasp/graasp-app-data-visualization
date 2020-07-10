import React from 'react';

import AccessChart from './containers/AccessChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { ACCESS_LINE_DATE_PICKER_ID } from './types';

const AccessWidget = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <AccessChart />
      <KeyedDatePicker
        id={ACCESS_LINE_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

export default AccessWidget;
