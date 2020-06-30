import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  buildDateRange,
  changeDateFormatForBarChart,
  selectedActions,
  fillData,
  formatDataForChart,
  fromDate,
  getVerbsTypesForBarChart,
  displayTheSelectedData,
  Occurrence,
  toDate,
} from '../util';
import {
  DATE,
  USER_ID,
  VERB_BAR_DATE_PICKER_ID,
  VERB_BAR_LEGEND_ID,
} from '../types/types';

const xAxis = 'date';
const yAxis = 'Occurrence';
const colors = {
  change: '#F5B7B1',
  changeAvg: '#F5B7B1',
  open: '#8E44AD',
  openAvg: '#8E44AD',
  navigate: '#bb93dd',
  navigateAvg: '#bb93dd',
  create: '#fe9788',
  createAvg: '#fe9788',
};

const BarData = (actions, userId, from, to, selectedActionsList) => {
  const dateRange = buildDateRange(from, to);
  const verbList = getVerbsTypesForBarChart(actions);
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
    selectedActions(chartDataById, VERB_BAR_LEGEND_ID),
  ),
  keys: getVerbsTypesForBarChart(content),
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(BarChart);
