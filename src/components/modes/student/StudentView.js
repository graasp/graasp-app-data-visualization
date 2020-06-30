import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../../layout/Header';
import VerbAvgWidget from './widgets/VerbAvgWidget';
import VerbRadarWidget from './widgets/VerbRadarWidget';

const styles = theme => ({
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
  },
  title: {
    ...theme.typography.h4,
    marginTop: 10,
    color: '#5050d2',
  },
});

export const StudentView = ({ classes }) => (
  <div>
    <Header />
    <div className={classes.main}>
      <Grid container sm={12}>
        <Grid item sm={6} className={classes.widget}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} gutterBottom>
              Actions
            </Typography>
            <VerbAvgWidget />
          </Paper>
        </Grid>
        <Grid item sm={6} className={classes.widget}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} gutterBottom>
              Your Activity Levels
            </Typography>
            <VerbRadarWidget />
          </Paper>
        </Grid>
      </Grid>
    </div>
  </div>
);

StudentView.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
    widget: PropTypes.string,
    paper: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(StudentView);

export default withTranslation()(StyledComponent);
