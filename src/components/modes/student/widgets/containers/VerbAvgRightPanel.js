import { connect } from 'react-redux';
import _ from 'lodash';
import RightPanelBox from '../components/RightPanelBox';
import {
  fillDataForRightPanelBox,
  formatDataForRadarOrRightPanel,
  Occurrence,
} from '../util';
import { AVG, USER, USER_ID, VERB } from '../types';
import { getUniqueVerbs } from '../../../teacher/widgets/util';

const tableProperties = [USER, AVG];

const filterData = (actions, userId, hiddenVerbs) => {
  const allowedVerbs = _.difference(getUniqueVerbs(actions), hiddenVerbs);
  const userList = Occurrence(actions, USER_ID);
  const formattedData = formatDataForRadarOrRightPanel(
    allowedVerbs,
    VERB,
    tableProperties,
  );
  return fillDataForRightPanelBox(
    actions,
    formattedData,
    userId,
    allowedVerbs,
    userList.length,
  );
};

const mapStateToProps = ({
  action: { content },
  context: { userId },
  appInstance: {
    content: {
      settings: { hiddenVerbs },
    },
  },
}) => ({
  data: filterData(content, userId, hiddenVerbs),
});

export default connect(mapStateToProps)(RightPanelBox);
