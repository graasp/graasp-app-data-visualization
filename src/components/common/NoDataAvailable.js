import React from 'react';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    ...theme.typography.h4,
    marginTop: 10,
    color: '#5050d2',
  },
  paper: {
    width: 'auto',
    margin: theme.spacing(),
    padding: theme.spacing(3),
    border: 1,
    textAlign: 'center',
    borderColor: '#5050d2',
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: 'rgba(253,242,255,0.56)',
  },
}));

function NoDataAvailable() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} gutterBottom>
        {t('Data is not available at the moment')}
      </Typography>
    </Paper>
  );
}

export default NoDataAvailable;
