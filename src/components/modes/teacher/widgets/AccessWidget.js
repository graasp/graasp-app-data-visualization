import React from 'react';

import AccessChart from './containers/AccessChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { ACCESS_LINE_DATE_PICKER_ID } from './types';

const AccessWidget = () => {
  return (
    <div>
      <AccessChart />
      <KeyedDatePicker id={ACCESS_LINE_DATE_PICKER_ID} />
    </div>
  );
};

export default AccessWidget;
