import { connect } from 'react-redux';

import BarChart from '../components/BarChart';
import {
  changeDateFormatForArray,
  changeDateFormatForBarChart,
  createDataForBarChart,
  fillDataForBarChart,
  fillTheDates,
  nbOfTicks,
} from '../util';
import { DATE, VERB_CHART_DATE_PICKER_ID } from '../types';
import { fromDate, toDate } from '../../../student/widgets/util';

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
  values: changeDateFormatForArray(
    fillTheDates(
      fromDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
      toDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
    ),
  ),
  maxTicks: nbOfTicks([4, 7, 12], [750, 1200, 1920], windowSize),
});

export default connect(mapStateToProps)(BarChart);
