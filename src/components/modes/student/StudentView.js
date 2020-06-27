import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from '../../layout/Header';
import VerbAvgWidget from './widgets/VerbAvgWidget';
import VerbRadarWidget from './widgets/VerbRadarWidget';

const styles = theme => ({
  main: {
    textAlign: 'center',
    margin: theme.spacing(),
  },
  message: {
    padding: theme.spacing(),
    backgroundColor: theme.status.danger.background[500],
    color: theme.status.danger.color,
    marginBottom: theme.spacing(2),
  },
});

export const StudentView = ({ classes }) => (
  <>
    <Header />
    <Grid container spacing={10}>
      <Grid item xs={12} className={classes.main}>
        <Grid container item xs={12} spacing={10}>
          <Grid item xs={6}>
            <Paper>
              <VerbAvgWidget />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <VerbRadarWidget />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>Hello</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>Hello</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
);

StudentView.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(StudentView);

export default withTranslation()(StyledComponent);
