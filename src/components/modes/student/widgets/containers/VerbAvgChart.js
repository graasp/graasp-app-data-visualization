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
  Occurrence,
  selectedActions,
  toDate,
} from '../util';
import {
  VERB_BAR_AVG_LEGEND_ID,
  DATE,
  USER_ID,
  VERB,
  VERB_BAR_DATE_PICKER_ID,
} from '../types';

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
  console.log(data);

  return data;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  chartDataById,
}) => ({
  data: BarData(
    content,
    userId,
    fromDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    toDate(chartDataById, VERB_BAR_DATE_PICKER_ID),
    selectedActions(chartDataById, VERB_BAR_AVG_LEGEND_ID),
  ),
  keys: getVerbsTypesForBarChart(content, VERB, exceptions),
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(BarChart);
