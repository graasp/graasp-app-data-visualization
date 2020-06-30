import { connect } from 'react-redux';
import getComponentById from '../../../../../reducers/chartDataById';

import BarChart from '../components/BarChart';
import {
  changeDateFormatForBarChart,
  createDataForBarChart,
  fillDataForBarChart,
  fillTheDates,
  Occurrence,
} from '../util';
import { DATE, VERB } from '../types';

const id = 'VerbChart';
const xAxis = DATE;
const yAxis = 'Occurrence';
const exceptions = ['unload', 'login', 'logout', 'access', 'cancel'];
const BarData = (actions, from, to) => {
  let data = [];

  if (actions && from && to) {
    const verbs = Occurrence(actions, VERB, exceptions);

    const dates = fillTheDates(from, to);

    const dataFormat = createDataForBarChart(dates, verbs, DATE);

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

const from = state => {
  const { chartDataById } = state;
  if (chartDataById) {
    const Obj = getComponentById(chartDataById, id)[id];
    if (Obj) {
      return Obj.from;
    }
  }
  return undefined;
};

const to = state => {
  const { chartDataById } = state;
  if (chartDataById) {
    const Obj = getComponentById(chartDataById, id)[id];
    if (Obj) {
      return Obj.to;
    }
  }
  return undefined;
};

const mapStateToProps = state => ({
  data: BarData(state.action.content, from(state), to(state)),
  keys: Occurrence(state.action.content, 'verb', exceptions),
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(BarChart);
