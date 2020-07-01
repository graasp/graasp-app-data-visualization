import React from 'react';
import { connect } from 'react-redux';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import Legend from '../../../common/Legend';
import {
  LEGEND_SUM_ATTRIBUTE,
  VERB_BAR_DATE_PICKER_ID,
  VERB_BAR_LEGEND_ID,
} from './types';
import VerbSumChart from './containers/VerbSumChart';

const VerbAvgWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <Legend id={VERB_BAR_LEGEND_ID} addedItems={[LEGEND_SUM_ATTRIBUTE]} />
      <VerbSumChart />
      <KeyedDatePicker
        id={VERB_BAR_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

const mapStateToProps = ({ chartDataById }) => ({
  isSum: chartDataById[VERB_BAR_LEGEND_ID],
});

export default connect(mapStateToProps)(VerbAvgWidget);
