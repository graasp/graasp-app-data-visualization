import { connect } from 'react-redux';

import LineChart from '../components/LineChart';
import {
  buildDateRange,
  fromDate,
  Occurrence,
  selectedActions,
  toDate,
} from '../util';
import {
  AVG,
  TOTAL,
  USER_ID,
  VERB_BAR_DATE_PICKER_ID,
  VERB_BAR_LEGEND_ID,
} from '../types';

import { fillData, formatDataForLineChart } from '../util/verbAvgLineChartData';
import { changeDateFormatForLineChart } from '../../../teacher/Widgets/util';

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
    data = fillData(actions, dataFormat, userId, userList.length, selected);
    data = changeDateFormatForLineChart(data);
  }
  return data;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  chartDataById,
}) => ({
  data: LineData(
    content,
    userId,
    fromDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    toDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    selectedActions(chartDataById, VERB_BAR_LEGEND_ID),
  ),
  colors,
  xAxis,
  yAxis,
});
export default connect(mapStateToProps)(LineChart);
