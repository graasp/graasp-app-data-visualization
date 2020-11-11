import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  changeDateFormatForBarChart,
  displayTheSelectedData,
  fillData,
  formatDataForBarChart,
  fromDate,
  getVerbsTypesForBarChart,
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
  TICK_NUMBER_FOR_TIME_PERIOD,
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

const exceptions = ['unload', 'login', 'logout', 'access', 'cancel'];

const BarData = (actions, userId, from, to, selectedActionsList) => {
  const dateRange = fillTheDates(from, to);
  const verbList = getVerbsTypesForBarChart(actions, exceptions);
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
  keys: getVerbsTypesForBarChart(content, exceptions),
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
  maxTicks: nbOfTicks(
    TICK_NUMBER_FOR_TIME_PERIOD.FULLSCREEN,
    [750, 1200, 1920],
    windowSize,
  ),
});

export default connect(mapStateToProps)(BarChart);
