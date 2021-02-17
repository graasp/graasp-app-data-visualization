import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { patchAppInstance } from '../../actions';
import { getUniqueVerbs } from '../modes/teacher/widgets/util';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  button: {
    margin: theme.spacing(),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  verbForm: {
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  checkbox: {
    width: '48%',
  },
  verbTitle: {
    width: '100%',
  },
});

function ActionsCheckboxes({
  verbs,
  classes,
  dispatchPatchAppInstance,
  t,
  settings,
}) {
  const { hiddenVerbs = [] } = settings;

  const handleChangeHiddenVerbs = verb => {
    const checked = !hiddenVerbs.includes(verb);
    let newHiddenVerbs = [...hiddenVerbs];
    if (checked) {
      newHiddenVerbs.push(verb);
    } else {
      newHiddenVerbs = newHiddenVerbs.filter(thisVerb => thisVerb !== verb);
    }
    const newSettings = {
      ...settings,
      hiddenVerbs: newHiddenVerbs,
    };
    dispatchPatchAppInstance({
      data: newSettings,
    });
  };

  const checkboxes = verbs.map(verb => {
    const checkbox = (
      <Checkbox
        color="primary"
        checked={!hiddenVerbs.includes(verb)}
        onChange={() => handleChangeHiddenVerbs(verb)}
        name={verb}
        value={verb}
      />
    );
    return (
      <FormControlLabel
        className={classes.checkbox}
        control={checkbox}
        label={verb}
      />
    );
  });
  return (
    <>
      <FormControl className={classes.verbForm}>
        <Typography variant="h6" className={classes.verbTitle}>
          {t('Include the following action verbs')}
        </Typography>
        {checkboxes}
      </FormControl>
    </>
  );
}

ActionsCheckboxes.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
    fab: PropTypes.string,
    verbTitle: PropTypes.string,
    checkbox: PropTypes.string,
    verbForm: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    headerVisible: PropTypes.bool.isRequired,
    studentsOnly: PropTypes.bool.isRequired,
    hiddenVerbs: PropTypes.arrayOf().isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    defaultNS: PropTypes.string,
  }).isRequired,
  verbs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatchPatchAppInstance: PropTypes.func.isRequired,
};

const mapStateToProps = ({ layout, appInstance, action: { content } }) => {
  return {
    open: layout.settings.open,
    settings: appInstance.content.settings,
    verbs: getUniqueVerbs(content).sort(),
  };
};

const mapDispatchToProps = {
  dispatchPatchAppInstance: patchAppInstance,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionsCheckboxes);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
