import React from 'react';

import VerbChart from './containers/VerbChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';

const VerbWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <VerbChart style={{ height: '100%' }} />
      <KeyedDatePicker id="VerbChart" initialValue={initialState} />
    </div>
  );
};

export default VerbWidget;
