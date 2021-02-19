import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Loader from '../../common/Loader';
import './TeacherView.css';
import { getUsers } from '../../../actions';
import Settings from './Settings';
import VerbWidget from './widgets/VerbWidget';
import AccessWidget from './widgets/AccessWidget';

export class TeacherView extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      main: PropTypes.string,
      widget: PropTypes.string,
      paper: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    activity: PropTypes.bool.isRequired,
  };

  static styles = theme => ({
    main: {
      textAlign: 'center',
      margin: theme.spacing(),
    },
    widget: {},
    paper: {
      width: 'auto',
      margin: theme.spacing(),
      padding: theme.spacing(3),
      textAlign: 'center',
      border: 1,
      borderColor: '#5050d2',
      borderStyle: 'solid',
      borderRadius: 20,
      backgroundColor: 'rgba(253,242,255,0.56)',
    },
    title: {
      ...theme.typography.h4,
      marginTop: 10,
      color: '#5050d2',
    },
  });

  render() {
    const { classes, activity } = this.props;

    if (activity) {
      return <Loader />;
    }

    return (
      <div className={classes.main}>
        <Settings />
        <Grid container>
          <Grid item sm={6} className={classes.widget}>
            <Paper className={classes.paper}>
              <Typography className={classes.title} gutterBottom>
                Number of Visits
              </Typography>
              <AccessWidget />
            </Paper>
          </Grid>
          <Grid item sm={6} className={classes.widget}>
            <Paper className={classes.paper}>
              <Typography className={classes.title} gutterBottom>
                Actions
              </Typography>
              <VerbWidget />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ users, appInstanceResources, action }) => ({
  // we transform the list of students in the database
  // to the shape needed by the select component
  studentOptions: users.content.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
  appInstanceResources: appInstanceResources.content,
  activity: Boolean(action.activity.length),
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetUsers: getUsers,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherView);

const StyledComponent = withStyles(TeacherView.styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
