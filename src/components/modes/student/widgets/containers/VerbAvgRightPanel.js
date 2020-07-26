import { connect } from 'react-redux';
import RightPanelBox from '../components/RightPanelBox';
import {
  fillDataForRightPanelBox,
  formatDataForRadarOrRightPanel,
  Occurrence,
} from '../util';
import { ALLOWED_VERBS, AVG, USER, USER_ID, VERB } from '../types';

const tableProperties = [USER, AVG];

const filterData = (actions, userId) => {
  const userList = Occurrence(actions, USER_ID);
  const formattedData = formatDataForRadarOrRightPanel(
    ALLOWED_VERBS,
    VERB,
    tableProperties,
  );
  return fillDataForRightPanelBox(
    actions,
    formattedData,
    userId,
    ALLOWED_VERBS,
    userList.length,
  );
};

const mapStateToProps = ({ action: { content }, context: { userId } }) => ({
  data: filterData(content, userId),
});

export default connect(mapStateToProps)(RightPanelBox);
