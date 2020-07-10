import { connect } from 'react-redux';

import LineChart from '../components/LineChart';
import {
  changeDateFormatForArray,
  changeDateFormatForLineChart,
  ChangePropertyNameOfObjectFromArray,
  createObjectForLine,
  DataPicking,
  fillTheDates,
  nbOfTicks,
  RemovePropertyOfObjectFromArray,
  TotalAccesses,
  UniqueAccesses,
} from '../util';
import {
  ACCESS_LINE_DATE_PICKER_ID,
  CREATED_AT,
  DATE,
  USER_ID,
  VERB,
} from '../types';
import { fromDate, toDate } from '../../../student/widgets/util';

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

const mapStateToProps = ({
  action: { content },
  windowSize: { windowSize },
  chartDataById,
}) => ({
  data: AccessData(
    content,
    fromDate(chartDataById, ACCESS_LINE_DATE_PICKER_ID),
    toDate(chartDataById, ACCESS_LINE_DATE_PICKER_ID),
  ),
  colors,
  xAxis,
  yAxis,
  values: changeDateFormatForArray(
    fillTheDates(
      fromDate(chartDataById, ACCESS_LINE_DATE_PICKER_ID),
      toDate(chartDataById, ACCESS_LINE_DATE_PICKER_ID),
    ),
  ),
  maxTicks: nbOfTicks([4, 7, 12], [750, 1200, 1920], windowSize),
});

export default connect(mapStateToProps)(LineChart);
