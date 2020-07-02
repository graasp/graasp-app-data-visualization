import { connect } from 'react-redux';
import getDateById from '../../../../../reducers/chartDataById';

import LineChart from '../components/LineChart';
import {
  changeDateFormatForArray,
  changeDateFormatForLineChart,
  ChangePropertyNameOfObjectFromArray,
  createObjectForLine,
  DataPicking,
  fillTheDates,
  RemovePropertyOfObjectFromArray,
  TotalAccesses,
  UniqueAccesses,
} from '../util';
import { CREATED_AT, DATE, USER_ID, VERB } from '../types';

const id = 'AccessChart';
const xAxis = 'date';
const yAxis = 'Visits';

const colors = {
  Total: '#BBAAFF',
  Unique: '#756DF4',
};

const AccessData = (actions, from, to) => {
  let data = [];

  if (actions.length > 0) {
    const date = fillTheDates(from, to);
    let accesses = DataPicking(
      actions,
      [CREATED_AT, VERB, USER_ID],
      [undefined, 'navigate', undefined],
    );

    accesses = RemovePropertyOfObjectFromArray(accesses, VERB);

    accesses = ChangePropertyNameOfObjectFromArray(accesses, CREATED_AT, DATE);

    let totalAccesses = TotalAccesses(accesses, DATE, date);

    let uniqueAccesses = UniqueAccesses(accesses, DATE, USER_ID, date);

    totalAccesses = createObjectForLine('Total', totalAccesses);

    uniqueAccesses = createObjectForLine('Unique', uniqueAccesses);

    data.push(uniqueAccesses);

    data.push(totalAccesses);

    data = changeDateFormatForLineChart(data);
  }

  return data;
};

const from = state => {
  const { chartDataById } = state;
  if (chartDataById) {
    const Obj = getDateById(chartDataById, id)[id];
    if (Obj) {
      return Obj.from;
    }
  }
  return undefined;
};

const to = state => {
  const { chartDataById } = state;
  if (chartDataById) {
    const Obj = getDateById(chartDataById, id)[id];
    if (Obj) {
      return Obj.to;
    }
  }
  return undefined;
};

const mapStateToProps = state => ({
  data: AccessData(state.action.content, from(state), to(state)),
  colors,
  xAxis,
  yAxis,
  values: changeDateFormatForArray(fillTheDates(from(state), to(state))),
  maxTicks: 12,
});

export default connect(mapStateToProps)(LineChart);
