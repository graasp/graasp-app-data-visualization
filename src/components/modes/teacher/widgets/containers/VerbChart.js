import { connect } from 'react-redux';
import _ from 'lodash';
import BarChart from '../components/BarChart';
import {
  changeDateFormatForBarChart,
  chunkData,
  createDataForBarChart,
  fillDataForBarChart,
  fillTheDates,
  formatDates,
  getUniqueVerbs,
} from '../util';
import { DATE, VERB_CHART_DATE_PICKER_ID } from '../types';
import { fromDate, toDate } from '../../../student/widgets/util';
import {
  LEGEND_WIDTH,
  TIME_PERIOD_LABEL_WIDTH,
  VERB_CHART_MAX_CHART_NUMBER,
} from '../../../../../config/settings';
import { nbOfTicks } from '../../../../../utils/layout';

// todo: automatically update
const defaultValues = { navigate: 0, open: 0, change: 0, create: 0 };

const xAxis = DATE;
const yAxis = 'Occurrence';
const BarData = (actions, from, to, hiddenVerbs) => {
  const allowedVerbs = _.difference(getUniqueVerbs(actions), hiddenVerbs);
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
  appInstance: {
    content: {
      settings: { hiddenVerbs },
    },
  },
}) => {
  const maxTicks = nbOfTicks({
    componentWidth: windowSize / 2,
    labelWidth: TIME_PERIOD_LABEL_WIDTH,
    margin: LEGEND_WIDTH,
  });
  return {
    data: BarData(
      content,
      fromDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
      toDate(chartDataById, VERB_CHART_DATE_PICKER_ID),
      hiddenVerbs,
    ),
    keys: _.difference(getUniqueVerbs(content), hiddenVerbs),
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
    maxTicks,
  };
};

export default connect(mapStateToProps)(BarChart);
