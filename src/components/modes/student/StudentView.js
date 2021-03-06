/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import VerbAvgWidget from './widgets/VerbAvgLineWidget';
import StudentSpeedOMeterWidget from './widgets/StudentSpeedOMeterWidget';
import VerbRadarWidget from './widgets/VerbRadarWidget';
import VerbAvgBarWidget from './widgets/VerbAvgBarWidget';
import VerbAvgRightPanelWidget from './widgets/VerbAvgRightPanelWidget';
import NoDataAvailable from '../../common/NoDataAvailable';

const styles = theme => ({
  main: {
    margin: theme.spacing(),
  },
  widget: {},
  paper: {
    width: 'auto',
    margin: theme.spacing(),
    padding: theme.spacing(2),
    border: 1,
    textAlign: 'center',
    borderColor: '#5050d2',
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: 'rgba(253,242,255,0.56)',
  },
  title: {
    textAlign: 'center',
    ...theme.typography.h4,
    marginTop: 10,
    color: '#5050d2',
  },
  ewfds: {
    width: '100%',
  },
  dddd: {
    width: '100%',
  },
  root: {
    flexGrow: 1,
  },
});

function isInRightPanel(tool) {
  return tool;
}

export const StudentView = ({ classes, tool, content, t }) => {
  if (content.length > 0) {
    if (isInRightPanel(tool)) {
      return (
        <div className={classes.main}>
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.widget}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} gutterBottom noWrap>
                  {t('Your Participation')}
                </Typography>
                <VerbAvgRightPanelWidget />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.widget}>
              <Paper className={classes.paper}>
                <StudentSpeedOMeterWidget />
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <div className={classes.main}>
          <Grid container>
            <Grid item sm={6} className={classes.widget}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} gutterBottom>
                  {t('Total Activity Actions')}
                </Typography>
                <VerbAvgWidget />
              </Paper>
            </Grid>
            <Grid item sm={6} className={classes.widget}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} gutterBottom>
                  {t('Your Activity Levels')}
                </Typography>
                <VerbRadarWidget />
              </Paper>
            </Grid>
            <Grid item sm={12} className={classes.widget}>
              <Paper className={classes.paper}>
                <Typography className={classes.title} gutterBottom>
                  {t('Detailed Activity Overview')}
                </Typography>
                <VerbAvgBarWidget />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
  return <NoDataAvailable />;
};

StudentView.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
    widget: PropTypes.string,
    paper: PropTypes.string,
    paperRightSide: PropTypes.string,
    meter: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  tool: PropTypes.bool.isRequired,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = ({ context: { tool }, action: { content } }) => {
  return {
    tool,
    content,
  };
};

const StyledComponent = withStyles(styles)(StudentView);

const TranslatedComponent = withTranslation()(StyledComponent);

export default connect(mapStateToProps)(TranslatedComponent);
