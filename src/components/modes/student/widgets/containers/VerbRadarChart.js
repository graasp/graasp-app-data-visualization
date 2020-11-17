import { connect } from 'react-redux';
import { fillTheDates } from '../../../teacher/widgets/util';
import RadarChart from '../components/RadarChart';
import { AVG, USER, USER_ID, VERB, VERB_RADAR_DATE_PICKER_ID } from '../types';
import {
  fillDataForRadar,
  formatDataForRadarOrRightPanel,
  fromDate,
  Occurrence,
  toDate,
} from '../util';

const chartProperties = [USER, AVG];

const allowedVerbs = ['create', 'change', 'open', 'navigate'];
const colors = {};
colors[USER] = '#decaff';
colors[AVG] = '#BBAAFF';
const RadarData = (actions, userId, from, to) => {
  const dateRange = fillTheDates(from, to);
  const formattedData = formatDataForRadarOrRightPanel(
    allowedVerbs,
    VERB,
    chartProperties,
  );
  const userList = Occurrence(actions, USER_ID);
  return fillDataForRadar(
    actions,
    formattedData,
    userId,
    dateRange,
    allowedVerbs,
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
