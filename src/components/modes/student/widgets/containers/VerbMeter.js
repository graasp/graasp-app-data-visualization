import { connect } from 'react-redux';
import _ from 'lodash';
import SpeedOMeter from '../components/SpeedOMeter';
import {
  fillDataActionByUser,
  formatDataForOMeter,
  formatDataForOMeterVerb,
  Occurrence,
  sumActionByWeight,
} from '../util';
import { AVG, MAX, USER, USER_ID } from '../types';
import { getUniqueVerbs } from '../../../teacher/widgets/util';

const segmentColors = ['#decaff', '#756DF4'];

const chartProperties = [USER, AVG, MAX];

const totalData = (actions, userId, hiddenVerbs) => {
  let data = {};
  if (actions.length > 0) {
    const userVerbList = [];
    const allowedVerbs = _.difference(getUniqueVerbs(actions), hiddenVerbs);
    const userList = Occurrence(actions, USER_ID);
    userList.forEach(user => {
      const userData = formatDataForOMeter(allowedVerbs, user, USER_ID);
      userVerbList.push(userData);
    });
    const fillData = fillDataActionByUser(actions, userVerbList, allowedVerbs);
    const summedData = sumActionByWeight(fillData, allowedVerbs);
    data = formatDataForOMeterVerb(
      summedData,
      userId,
      userList,
      chartProperties,
    );
  }
  return data;
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
  value: totalData(content, userId, hiddenVerbs),
  colors: segmentColors,
  segments: 2,
});

export default connect(mapStateToProps)(SpeedOMeter);
