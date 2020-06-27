import { connect } from 'react-redux';
import RadarChart from '../components/RadarChart';
import {
  AVG,
  buildDateRange,
  fillDataForRadar,
  formatDataForRadar,
  fromDate,
  Occurrence,
  RemoveObjectWithAttributeFromArray,
  toDate,
  USER,
  USER_ID,
  VERB,
  VERB_RADAR_WIDGET_ID,
} from '../util';

const chartProperties = [USER, AVG];
const RadarData = (actions, userId, from, to) => {
  const dateRange = buildDateRange(from, to);
  const verbList = Occurrence(actions, VERB);
  const formattedData = formatDataForRadar(verbList, VERB, chartProperties);
  const userList = Occurrence(actions, USER_ID);
  let data = fillDataForRadar(
    actions,
    formattedData,
    userId,
    dateRange,
    userList.length,
  );

  data = RemoveObjectWithAttributeFromArray(data, VERB, [
    'logout',
    'login',
    'unload',
  ]);
  return data;
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  chartDateById,
}) => ({
  data: RadarData(
    content,
    userId,
    fromDate(chartDateById, VERB_RADAR_WIDGET_ID),
    toDate(chartDateById, VERB_RADAR_WIDGET_ID),
  ),
  keys: chartProperties,
  indexBy: VERB,
});

export default connect(mapStateToProps)(RadarChart);
