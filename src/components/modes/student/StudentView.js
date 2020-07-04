import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VerbAvgWidget from './widgets/VerbAvgLineWidget';
import VerbRadarWidget from './widgets/VerbRadarWidget';
import VerbAvgBarWidget from './widgets/VerbAvgBarWidget';

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
    backgroundColor: 'rgba(253,242,255,0.56)',
  },
  title: {
    ...theme.typography.h4,
    marginTop: 10,
    color: '#5050d2',
  },
});

export const StudentView = ({ classes }) => (
  <div>
    <div className={classes.main}>
      <Grid container>
        <Grid item sm={6} className={classes.widget}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} gutterBottom>
              Total Activity Actions
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
        <Grid item sm={12} className={classes.widget}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} gutterBottom>
              Detailed Activity Overview
            </Typography>
            <VerbAvgBarWidget />
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
