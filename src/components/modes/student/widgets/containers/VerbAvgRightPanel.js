import { connect } from 'react-redux';
import RightPanelBox from '../components/RightPanelBox';
import {
  formatDataForRadar,
  fillDataForRightPanelBox,
  Occurrence,
} from '../util';
import { AVG, USER, USER_ID, VERB } from '../types';

const allowedVerbs = ['create', 'change', 'open', 'navigate', 'executed'];
const chartProperties = [USER, AVG];

const filterData = (actions, userId) => {
  const userList = Occurrence(actions, USER_ID);
  const formattedData = formatDataForRadar(allowedVerbs, VERB, chartProperties);
  const data = fillDataForRightPanelBox(
    actions,
    formattedData,
    userId,
    allowedVerbs,
    userList.length,
  );
  return data;
};

const mapStateToProps = ({ action: { content }, context: { userId } }) => ({
  data: filterData(content, userId),
});

export default connect(mapStateToProps)(RightPanelBox);
