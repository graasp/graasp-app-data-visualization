import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import { Fab } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import {
  closeSettings,
  getActions,
  openSettings,
  patchAppInstance,
} from '../../../actions';
import { getUniqueVerbs } from './widgets/util';
import SpaceTree from '../../common/SpaceTree';
import ActionsCheckboxes from '../../common/ActionsCheckboxes';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    overflow: 'auto',
    maxHeight: '80%',
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

class Settings extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      paper: PropTypes.string,
      fab: PropTypes.string,
      verbTitle: PropTypes.string,
      checkbox: PropTypes.string,
      verbForm: PropTypes.string,
      form: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      headerVisible: PropTypes.bool.isRequired,
      studentsOnly: PropTypes.bool.isRequired,
      hiddenVerbs: PropTypes.arrayOf().isRequired,
      spaces: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    dispatchCloseSettings: PropTypes.func.isRequired,
    dispatchPatchAppInstance: PropTypes.func.isRequired,
    dispatchOpenSettings: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    dispatchGetActions: PropTypes.func.isRequired,
  };

  state = {
    selectedSpacesState: [],
  };

  saveSettings = settingsToChange => {
    const { settings, dispatchPatchAppInstance } = this.props;
    const newSettings = {
      ...settings,
      ...settingsToChange,
    };
    dispatchPatchAppInstance({
      data: newSettings,
    });
  };

  handleChangeHeaderVisibility = () => {
    const {
      settings: { headerVisible },
    } = this.props;
    const settingsToChange = {
      headerVisible: !headerVisible,
    };
    this.saveSettings(settingsToChange);
  };

  handleClose = () => {
    const { dispatchCloseSettings, settings, dispatchGetActions } = this.props;
    const { selectedSpacesState } = this.state;
    dispatchCloseSettings();

    // fetch actions again if selected spaces changed
    if (!_.isEqual(selectedSpacesState, settings.spaces)) {
      dispatchGetActions();
    }
  };

  handleOpen = () => {
    const { dispatchOpenSettings, settings } = this.props;
    // set initial settings state to compare on close
    this.setState({ selectedSpacesState: settings.spaces });

    dispatchOpenSettings();
  };

  renderModalContent() {
    const { t, settings, classes } = this.props;
    const { headerVisible } = settings;

    const switchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        onChange={this.handleChangeHeaderVisibility}
        value="headerVisibility"
      />
    );

    return (
      <>
        <FormControl component="fieldset" className={classes.form}>
          <FormControlLabel
            control={switchControl}
            label={t('Show Header to Students')}
          />
          <ActionsCheckboxes />
        </FormControl>

        <SpaceTree />
      </>
    );
  }

  render() {
    const { open, classes, t } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              {t('Settings')}
            </Typography>
            {this.renderModalContent()}
          </div>
        </Modal>
        <Fab
          color="primary"
          aria-label={t('Settings')}
          className={classes.fab}
          onClick={() => this.handleOpen()}
        >
          <SettingsIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, appInstance, action: { content } }) => {
  return {
    open: layout.settings.open,
    settings: appInstance.content.settings,
    verbs: getUniqueVerbs(content).sort(),
  };
};

const mapDispatchToProps = {
  dispatchCloseSettings: closeSettings,
  dispatchOpenSettings: openSettings,
  dispatchPatchAppInstance: patchAppInstance,
  dispatchGetActions: getActions,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
