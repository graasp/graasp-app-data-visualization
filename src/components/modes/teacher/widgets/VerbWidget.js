import React from 'react';

import VerbChart from './containers/VerbChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';

const VerbWidget = () => {
  const initialState = {
    from: new Date(new Date(Date.now()).toLocaleDateString()),
    to: new Date(new Date(Date.now()).toLocaleDateString()),
  };

  return (
    <div>
      <VerbChart style={{ height: '100%' }} />
      <KeyedDatePicker id="VerbChart" initialValue={initialState} />
    </div>
  );
};

export default VerbWidget;
