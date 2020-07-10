import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  buildDateRange,
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
  changeDateFormatForArray,
  fillTheDates,
} from '../../../teacher/widgets/util';

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
  const dateRange = buildDateRange(from, to);
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
  values: changeDateFormatForArray(
    fillTheDates(
      fromDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
      toDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    ),
  ),
  maxTicks: nbOfTicks([4, 7, 12], [750, 1200, 1920], windowSize),
});

export default connect(mapStateToProps)(BarChart);
