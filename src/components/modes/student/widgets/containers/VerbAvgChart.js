import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  buildDateRange,
  changeDateFormatForBarChart,
  displayTheSelectedData,
  fillData,
  formatDataForChart,
  fromDate,
  getVerbsTypesForBarChart,
  Occurrence,
  selectedActions,
  toDate,
  aggregateData,
} from '../util';
import {
  DATE,
  USER_ID,
  VERB_BAR_DATE_PICKER_ID,
  VERB_BAR_LEGEND_ID,
  LEGEND_SUM_ATTRIBUTE,
  USER,
  AVG,
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

const colorsForActionSum = {};
colorsForActionSum[USER] = '#decaff';
colorsForActionSum[AVG] = '#BBAAFF';
const exceptions = ['unload', 'login', 'logout', 'access', 'cancel'];

const BarData = (actions, userId, from, to, selectedActionsList) => {
  const dateRange = buildDateRange(from, to);
  const verbList = getVerbsTypesForBarChart(actions, exceptions);
  const formattedData = formatDataForChart(dateRange, verbList, DATE);
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

  if (selectedActionsList.includes(LEGEND_SUM_ATTRIBUTE)) {
    data = aggregateData(data, USER, AVG);
  }
  return data;
};

const isSumChecked = chartDataById => {
  return chartDataById[VERB_BAR_LEGEND_ID].payload.includes(
    LEGEND_SUM_ATTRIBUTE,
  );
};

const getAppropriateKeys = (chartDataById, content, exception) => {
  if (chartDataById[VERB_BAR_LEGEND_ID]) {
    if (isSumChecked(chartDataById)) {
      return [USER, AVG];
    }
    return getVerbsTypesForBarChart(content, exception);
  }
  return [];
};

const getAppropriateColors = chartDataById => {
  if (chartDataById[VERB_BAR_LEGEND_ID]) {
    if (isSumChecked(chartDataById)) {
      return colorsForActionSum;
    }
    return colors;
  }
  return [];
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
    selectedActions(chartDataById, VERB_BAR_LEGEND_ID),
  ),
  keys: getAppropriateKeys(chartDataById, content, exceptions),
  colors: getAppropriateColors(chartDataById),
  indexBy: 'date',
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(BarChart);
