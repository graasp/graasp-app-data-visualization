import { connect } from 'react-redux';
import RadarChart from '../components/RadarChart';
import { VERB, USER_ID, USER, AVG } from '../util/types';
import {
  fromDate,
  toDate,
  buildDateRange,
  formatDataForRadar,
  Occurrence,
  fillDataForRadar,
} from '../util';

const id = 'VerbRadarWidget';

const RadarData = (actions, userId, from, to) => {
  const dateRange = buildDateRange(from, to);
  const verbList = Occurrence(actions, VERB);
  const formattedData = formatDataForRadar(verbList, VERB, [USER, AVG]);
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
    fromDate(chartDateById, id),
    toDate(chartDateById, id),
  ),
});

export default connect(mapStateToProps)(RadarChart);
