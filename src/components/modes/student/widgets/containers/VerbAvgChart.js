import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  changeDateFormatForBarChart,
  displayTheSelectedData,
  fillData,
  formatDataForBarChart,
  fromDate,
  getVerbsForBarChart,
  nbOfTicks,
  Occurrence,
  selectedActions,
  toDate,
} from '../util';
import {
  DATE,
  USER_ID,
  VERB_BAR_AVG_LEGEND_ID,
  VERB_BAR_DATE_PICKER_ID,
} from '../types';
import {
  chunkData,
  fillTheDates,
  formatDates,
} from '../../../teacher/widgets/util';
import {
  VERB_AVG_CHART_MAX_CHART_NUMBER,
  TIME_PERIOD_LABEL_WIDTH,
  LEGEND_WIDTH,
} from '../../../../../config/settings';

const xAxis = 'date';
const yAxis = 'Occurrence';

const colors = {
  open: '#decaff',
  openAvg: '#decaff',
  navigate: '#BBAAFF',
  navigateAvg: '#BBAAFF',
  create: '#988BFF',
  createAvg: '#988BFF',
  change: '#756DF4',
  changeAvg: '#756DF4',
};

const BarData = (actions, userId, from, to, selectedActionsList) => {
  const dateRange = fillTheDates(from, to);
  const verbList = getVerbsForBarChart(actions);
  const formattedData = formatDataForBarChart(dateRange, verbList, DATE);
  const userList = Occurrence(actions, USER_ID);
  // The below function will compute the average of each type of action with respect to a user
  let data = fillData(
    actions,
    formattedData,
    userId,
    verbList,
    userList.length,
  );
  data = changeDateFormatForBarChart(data);
  data = chunkData({}, data, VERB_AVG_CHART_MAX_CHART_NUMBER);
  data = displayTheSelectedData(data, selectedActionsList);
  return data;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  windowSize: { windowSize },
  chartDataById,
}) => ({
  data: BarData(
    content,
    userId,
    fromDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    toDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    selectedActions(chartDataById, VERB_BAR_AVG_LEGEND_ID),
  ),
  keys: getVerbsForBarChart(content),
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
  id: VERB_BAR_AVG_LEGEND_ID,
  values: formatDates(
    fillTheDates(
      fromDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
      toDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    ),
    VERB_AVG_CHART_MAX_CHART_NUMBER,
  ),
  maxTicks: nbOfTicks({
    componentWidth: windowSize,
    labelWidth: TIME_PERIOD_LABEL_WIDTH,
    margin: LEGEND_WIDTH,
  }),
});

export default connect(mapStateToProps)(BarChart);
