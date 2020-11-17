import { connect } from 'react-redux';

import LineChart from '../components/LineChart';
import {
  changeDateFormatForArray,
  changeDateFormatForLineChart,
  fillDataForLineChart,
  formatDataForLineChart,
  fromDate,
  nbOfTicks,
  Occurrence,
  selectedActions,
  toDate,
} from '../util';
import {
  AVG,
  TOTAL,
  USER_ID,
  VERB_LINE_AVG_LEGEND_ID,
  VERB_LINE_DATE_PICKER_ID,
} from '../types';
import { fillTheDates } from '../../../teacher/widgets/util';
import {
  SCREEN_SIZE_RANGE,
  TICK_NUMBER_FOR_DATE_FULL_YEAR,
} from '../../../../../config/settings';

const xAxis = 'date';
const yAxis = 'Occurrence';
const colors = {};
colors[TOTAL] = '#BBAAFF';
colors[AVG] = '#756DF4';

const LineData = (actions, userId, from, to, selected) => {
  let data = [];
  if (actions.length > 0) {
    const dateRange = fillTheDates(from, to);
    const userList = Occurrence(actions, USER_ID);
    const dataFormat = formatDataForLineChart(dateRange, [AVG, TOTAL]);
    data = fillDataForLineChart(
      actions,
      dataFormat,
      userId,
      userList.length,
      selected,
    );
    data = changeDateFormatForLineChart(data);
  }
  return data;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  windowSize: { windowSize },
  chartDataById,
}) => ({
  data: LineData(
    content,
    userId,
    fromDate(chartDataById, VERB_LINE_DATE_PICKER_ID),
    toDate(chartDataById, VERB_LINE_DATE_PICKER_ID),
    selectedActions(chartDataById, VERB_LINE_AVG_LEGEND_ID),
  ),
  colors,
  xAxis,
  yAxis,
  id: VERB_LINE_AVG_LEGEND_ID,
  values: changeDateFormatForArray(
    fillTheDates(
      fromDate(chartDataById, VERB_LINE_DATE_PICKER_ID),
      toDate(chartDataById, VERB_LINE_DATE_PICKER_ID),
    ),
  ),
  maxTicks: nbOfTicks(
    TICK_NUMBER_FOR_DATE_FULL_YEAR,
    SCREEN_SIZE_RANGE,
    windowSize,
  ),
});
export default connect(mapStateToProps)(LineChart);
