import { connect } from 'react-redux';
import RadarChart from '../components/RadarChart';
import getDateById from '../../../../../reducers/chartDateById';
import { VERB, USER_ID } from '../util/types';
import {
  buildDateRange,
  formatDataForRadar,
  Occurrence,
  fillDataForRadar,
} from '../util';

const id = 'VerbRadarWidget';

const BarData = (actions, userId, fromDate, toDate) => {
  const dateRange = buildDateRange(fromDate, toDate);
  const verbList = Occurrence(actions, VERB);
  const formattedData = formatDataForRadar(verbList, dateRange, VERB);
  const userList = Occurrence(actions, USER_ID);
  const data = fillDataForRadar(
    actions,
    formattedData,
    userId,
    dateRange,
    userList.length,
  );
  return data;
};

const fromDate = chartDateById => {
  if (chartDateById) {
    const Obj = getDateById(chartDateById, id)[id];
    if (Obj) {
      return Obj.from;
    }
  }
  return undefined;
};

const toDate = chartDateById => {
  if (chartDateById) {
    const Obj = getDateById(chartDateById, id)[id];
    if (Obj) {
      return Obj.to;
    }
  }
  return undefined;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  chartDateById,
}) => ({
  data: BarData(
    content,
    userId,
    fromDate(chartDateById),
    toDate(chartDateById),
  ),
});

export default connect(mapStateToProps)(RadarChart);
