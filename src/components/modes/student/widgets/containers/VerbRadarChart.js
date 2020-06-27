import { connect } from 'react-redux';
import RadarChart from '../components/RadarChart';
import {
  VERB_RADAR_WIDGET_ID,
  VERB,
  USER_ID,
  USER,
  AVG,
  fromDate,
  toDate,
  buildDateRange,
  formatDataForRadar,
  Occurrence,
  fillDataForRadar,
} from '../util';

const chartProperties = [USER, AVG];
const RadarData = (actions, userId, from, to) => {
  const dateRange = buildDateRange(from, to);
  const verbList = Occurrence(actions, VERB);
  const formattedData = formatDataForRadar(verbList, VERB, chartProperties);
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
