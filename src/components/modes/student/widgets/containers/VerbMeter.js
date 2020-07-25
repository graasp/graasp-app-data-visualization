import { connect } from 'react-redux';
import SpeedOMeter from '../components/SpeedOMeter';
import {
  fillDataActionByUser,
  formatDataForOMeter,
  formatDataForOMeterVerb,
  Occurrence,
  sumActionByWeight,
} from '../util';
import { ALLOWED_VERBS, AVG, MAX, USER, USER_ID } from '../types';

const segmentColors = ['#decaff', '#756DF4'];

const chartProperties = [USER, AVG, MAX];

const verbWithWeight = {
  create: 1,
  change: 1,
  open: 1,
  navigate: 1,
};

const totalData = (actions, userId) => {
  let data = {};
  if (actions.length > 0) {
    const userVerbList = [];
    const userList = Occurrence(actions, USER_ID);
    userList.forEach(user => {
      const userData = formatDataForOMeter(ALLOWED_VERBS, user, USER_ID);
      userVerbList.push(userData);
    });
    const fillData = fillDataActionByUser(actions, userVerbList, ALLOWED_VERBS);
    const summedData = sumActionByWeight(fillData, verbWithWeight);
    data = formatDataForOMeterVerb(
      summedData,
      userId,
      userList,
      chartProperties,
    );
  }
  return data;
};

const mapStateToProps = ({ action: { content }, context: { userId } }) => ({
  value: totalData(content, userId),
  colors: segmentColors,
  segments: 2,
});

export default connect(mapStateToProps)(SpeedOMeter);
