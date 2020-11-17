import { connect } from 'react-redux';
import BarChart from '../components/BarChart';
import {
  changeDateFormatForBarChart,
  chunkData,
  createDataForBarChart,
  fillDataForBarChart,
  fillTheDates,
  formatDates,
  getUniqueVerbs,
  nbOfTicks,
} from '../util';
import { DATE, VERB_CHART_DATE_PICKER_ID } from '../types';
import { fromDate, toDate } from '../../../student/widgets/util';
import {
  SCREEN_SIZE_RANGE,
  TICK_NUMBER_FOR_TIME_PERIOD,
  VERB_CHART_MAX_CHART_NUMBER,
} from '../../../../../config/settings';

// todo: automatically update
const defaultValues = { navigate: 0, open: 0, change: 0, create: 0 };

const xAxis = DATE;
const yAxis = 'Occurrence';
const BarData = (actions, from, to) => {
  const allowedVerbs = getUniqueVerbs(actions);
  let data = [];
  if (actions && from && to) {
    const dates = fillTheDates(from, to);
    const dataFormat = createDataForBarChart(dates, allowedVerbs, DATE);
    data = fillDataForBarChart(actions, dataFormat);
    data = changeDateFormatForBarChart(data);
    data = chunkData(defaultValues, data, VERB_CHART_MAX_CHART_NUMBER);
  }
  return data;
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
  keys: getUniqueVerbs(content),
  indexBy: 'date',
  xAxis,
  yAxis,
  values: formatDates(
    fillTheDates(
      fromDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
      toDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
    ),
    VERB_CHART_MAX_CHART_NUMBER,
  ),
  maxTicks: nbOfTicks(
    TICK_NUMBER_FOR_TIME_PERIOD.HALFSCREEN,
    SCREEN_SIZE_RANGE,
    windowSize,
  ),
});

export default connect(mapStateToProps)(BarChart);
