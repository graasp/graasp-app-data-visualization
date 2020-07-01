import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';

import PropTypes from 'prop-types';
import Loader from '../../../common/Loader';
import VerbAvgChart from './containers/VerbAvgChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import Legend from '../../../common/Legend';
import {
  LEGEND_SUM_ATTRIBUTE,
  VERB_BAR_DATE_PICKER_ID,
  VERB_BAR_LEGEND_ID,
} from './types';
import VerbSumChart from './containers/VerbSumChart';

const VerbAvgWidget = ({ isSum }) => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  const Chart = () => {
    if (isSum) {
      if (isSum.payload.includes(LEGEND_SUM_ATTRIBUTE)) {
        return <VerbSumChart />;
      }
      return <VerbAvgChart />;
    }
    return <Loader />;
  };

  return (
    <div>
      <Box display="flex">
        {Chart()}
        <Box mt={5}>
          <Legend id={VERB_BAR_LEGEND_ID} addedItems={[LEGEND_SUM_ATTRIBUTE]} />
        </Box>
      </Box>
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

VerbAvgWidget.propTypes = {
  isSum: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(VerbAvgWidget);
