/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';
import { getActions, getAppInstanceResources } from '../../../actions';
import Loader from '../../common/Loader';
import NoDataAvailable from '../../common/NoDataAvailable';

class StudentMode extends Component {
  static propTypes = {
    appInstanceId: PropTypes.string,
    view: PropTypes.string,
    activity: PropTypes.number,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    dispatchGetActions: PropTypes.func.isRequired,
    userId: PropTypes.string,
    action: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
  };

  static defaultProps = {
    view: 'normal',
    appInstanceId: null,
    activity: 0,
    userId: null,
  };

  componentDidMount() {
    const {
      userId,
      dispatchGetAppInstanceResources,
      dispatchGetActions,
    } = this.props;

    // by default get the resources for this user
    dispatchGetAppInstanceResources({ userId });
    // by default get all actions for this user
    // a non-admin user can only fetch public actions
    dispatchGetActions({ visibility: 'public' });
  }

  componentDidUpdate({ appInstanceId: prevAppInstanceId }) {
    const {
      appInstanceId,
      dispatchGetAppInstanceResources,
      userId,
    } = this.props;
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      dispatchGetAppInstanceResources({ userId });
    }
  }

  render() {
    const { view, activity, action } = this.props;
    if (activity) {
      return <Loader />;
    }
    if (!action?.content.length) {
      return <NoDataAvailable />;
    }

    switch (view) {
      case FEEDBACK_VIEW:
      case DEFAULT_VIEW:
      default:
        return <StudentView />;
    }
  }
}
const mapStateToProps = ({ context, appInstanceResources, action }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
    action,
    activity: appInstanceResources.activity.length,
  };
};

const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
  dispatchGetActions: getActions,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentMode);

export default ConnectedComponent;
