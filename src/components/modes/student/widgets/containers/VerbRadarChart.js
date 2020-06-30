import { connect } from 'react-redux';
import RadarChart from '../components/RadarChart';
import {
  AVG,
  USER,
  USER_ID,
  VERB,
  VERB_RADAR_DATE_PICKER_ID,
} from '../types/types';
import {
  buildDateRange,
  fillDataForRadar,
  formatDataForRadar,
  fromDate,
  Occurrence,
  RemoveObjectWithAttributeFromArray,
  toDate,
} from '../util';

const chartProperties = [USER, AVG];
const filteredVerbs = ['logout', 'login', 'unload', 'access', 'cancel'];
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
  data = RemoveObjectWithAttributeFromArray(data, VERB, filteredVerbs);
  return data;
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
  keys: chartProperties,
  indexBy: VERB,
});

export default connect(mapStateToProps)(RadarChart);
