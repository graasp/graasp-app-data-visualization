import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  changeDateFormatForBarChart,
  chunkData,
  createDataForBarChart,
  fillDataForBarChart,
  fillTheDates,
  formatDates,
  nbOfTicks,
} from '../util';
import { DATE, VERB_CHART_DATE_PICKER_ID } from '../types';
import { fromDate, toDate } from '../../../student/widgets/util';

const MAX_CHART_NUMBER = 7;

// todo: automatically update
const defaultValues = { navigate: 0, open: 0, change: 0, create: 0 };

const xAxis = DATE;
const yAxis = 'Occurrence';
const allowedVerbs = ['create', 'change', 'open', 'navigate'];
const BarData = (actions, from, to) => {
  let data = [];
  if (actions && from && to) {
    const dates = fillTheDates(from, to);
    const dataFormat = createDataForBarChart(dates, allowedVerbs, DATE);
    data = fillDataForBarChart(actions, dataFormat);
    data = changeDateFormatForBarChart(data);
    data = chunkData(defaultValues, data, MAX_CHART_NUMBER);
  }
  return data;
};
const colors = {
  open: '#decaff',
  navigate: '#BBAAFF',
  create: '#988BFF',
  change: '#756DF4',
};

const mapStateToProps = ({
  action: { content },
  windowSize: { windowSize },
  chartDataById,
}) => ({
  data: BarData(
    content,
    fromDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
    toDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
  ),
  keys: allowedVerbs,
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
  values: formatDates(
    fillTheDates(
      fromDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
      toDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
    ),
    MAX_CHART_NUMBER,
  ),
  maxTicks: nbOfTicks([2, 3, 4], [800, 1200, 1920], windowSize),
});

export default connect(mapStateToProps)(BarChart);
