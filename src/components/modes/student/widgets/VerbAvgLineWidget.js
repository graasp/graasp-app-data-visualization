import React from 'react';
import { connect } from 'react-redux';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import Legend from '../../../common/Legend';
import { VERB_LINE_DATE_PICKER_ID, VERB_LINE_AVG_LEGEND_ID } from './types';
import VerbSumChart from './containers/VerbSumChart';

const VerbAvgLineWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <Legend id={VERB_LINE_AVG_LEGEND_ID} />
      <VerbSumChart />
      <KeyedDatePicker
        id={VERB_LINE_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

const mapStateToProps = ({ chartDataById }) => ({
  isSum: chartDataById[VERB_LINE_AVG_LEGEND_ID],
});

export default connect(mapStateToProps)(VerbAvgLineWidget);
