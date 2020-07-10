import { connect } from 'react-redux';

import LineChart from '../components/LineChart';
import {
  buildDateRange,
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

const xAxis = 'date';
const yAxis = 'Occurrence';
const colors = {};
colors[TOTAL] = '#BBAAFF';
colors[AVG] = '#756DF4';

const LineData = (actions, userId, from, to, selected) => {
  let data = [];
  if (actions.length > 0) {
    const dateRange = buildDateRange(from, to);
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
    buildDateRange(
      fromDate(chartDataById, VERB_LINE_DATE_PICKER_ID),
      toDate(chartDataById, VERB_LINE_DATE_PICKER_ID),
    ),
  ),
  maxTicks: nbOfTicks([4, 7, 12], [750, 1200, 1920], windowSize),
});
export default connect(mapStateToProps)(LineChart);
