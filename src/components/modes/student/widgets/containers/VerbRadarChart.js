import { connect } from 'react-redux';
import RadarChart from '../components/RadarChart';
import { AVG, USER, USER_ID, VERB, VERB_RADAR_DATE_PICKER_ID } from '../types';
import {
  buildDateRange,
  fillDataForRadar,
  formatDataForRadar,
  fromDate,
  Occurrence,
  toDate,
} from '../util';

const chartProperties = [USER, AVG];
const exceptions = ['unload', 'login', 'logout', 'access', 'cancel'];
const colors = {};

colors[USER] = '#decaff';
colors[AVG] = '#BBAAFF';

const RadarData = (actions, userId, from, to) => {
  const dateRange = buildDateRange(from, to);
  const verbList = Occurrence(actions, VERB, exceptions);
  const formattedData = formatDataForRadar(verbList, VERB, chartProperties);
  const userList = Occurrence(actions, USER_ID);

  return fillDataForRadar(
    actions,
    formattedData,
    userId,
    dateRange,
    verbList,
    userList.length,
  );
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  chartDataById,
}) => ({
  data: RadarData(
    content,
    userId,
    fromDate(chartDataById, VERB_RADAR_DATE_PICKER_ID),
    toDate(chartDataById, VERB_RADAR_DATE_PICKER_ID),
  ),
  colors,
  keys: chartProperties,
  indexBy: VERB,
});

export default connect(mapStateToProps)(RadarChart);
