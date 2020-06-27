import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  fromDate,
  toDate,
  buildDateRange,
  fillData,
  Occurrence,
  formatDataForChart,
  getVerbsTypesForBarChart,
  VERB_BAR_CHART_ID,
  DATE,
  USER_ID,
} from '../util';

const xAxis = 'date';
const yAxis = 'Occurrence';
const colors = {
  change: '#9696ff',
  changeAvg: '#9696ff',
  access: '#7878fa',
  accessAvg: '#7878fa',
  open: '#6464e6',
  openAvg: '#6464e6',
  login: '#3f3cbe',
  loginAvg: '#3f3cbe',
  navigate: '#5a5adc',
  navigateAvg: '#5a5adc',
  create: '#3232b4',
  createAvg: '#3232b4',
  unload: '#8082a5',
  unloadAvg: '#8082a5',
  cancel: '#8082a5',
  cancelAvg: '#8082a5',
  logout: '#5050d2',
  logoutAvg: '#5050d2',
};

const BarData = (actions, userId, from, to) => {
  const dateRange = buildDateRange(from, to);
  const verbList = getVerbsTypesForBarChart(actions);
  const formattedData = formatDataForChart(dateRange, verbList, DATE);
  const userList = Occurrence(actions, USER_ID);
  // The below function will compute the average of each type of action with respect to a user
  const data = fillData(
    actions,
    formattedData,
    userId,
    verbList,
    userList.length,
  );
  return data;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  chartDateById,
}) => ({
  data: BarData(
    content,
    userId,
    fromDate(chartDateById, VERB_BAR_CHART_ID),
    toDate(chartDateById, VERB_BAR_CHART_ID),
  ),
  keys: getVerbsTypesForBarChart(content),
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(BarChart);
