import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import './TeacherView.css';
import { getUsers } from '../../../actions';

import VerbWidget from './Widgets/VerbWidget';
import AccessWidget from './Widgets/AccessWidget';

export class TeacherView extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string,
      main: PropTypes.string,
      button: PropTypes.string,
      message: PropTypes.string,
      fab: PropTypes.string,
    }).isRequired,
  };

  useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(10),
      margin: '50px',
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

  render() {
    const { classes } = this.props;

    // const classes = this.useStyles();

    // extract properties from the props object
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={10}>
            <>
              <Grid item xs={6}>
                <Paper>
                  <AccessWidget />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <VerbWidget />
                </Paper>
              </Grid>
            </>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <>
            <Grid item xs={12}>
              <Paper>
                <AccessWidget />
              </Paper>
            </Grid>
          </>
        </Grid>
      </div>
    );
  }
}

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ users, appInstanceResources }) => ({
  // we transform the list of students in the database
  // to the shape needed by the select component
  studentOptions: users.content.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
  appInstanceResources: appInstanceResources.content,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetUsers: getUsers,
  // dispatchGetActios: getActions,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherView);

const StyledComponent = withStyles(TeacherView.styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
