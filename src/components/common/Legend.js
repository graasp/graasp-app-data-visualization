import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import updateLegendById from '../../actions/chartLegendById';
import { Occurrence } from '../modes/student/widgets/util';
import { VERB } from '../modes/student/widgets/types';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (verb, action, theme) => {
  return {
    fontWeight:
      action.indexOf(verb) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const Legend = ({ id }) => {
  const theme = useTheme();
  const classes = useStyles();
  const actions = useSelector(state => state.action.content);
  const verbList = Occurrence(actions, VERB);
  const [action, setAction] = useState([]);
  const dispatch = useDispatch();

  const handleChange = event => {
    setAction(event.target.value);
  };

  useEffect(() => {
    dispatch(updateLegendById(action, id));
  }, [action]);

  return (
    <div>
      <InputLabel id="Action-chip-filter">Actions</InputLabel>
      <Select
        labelId="Action-chip-filter-label"
        id="Action-chip-filter"
        multiple
        value={action}
        onChange={handleChange}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {verbList.map(verb => (
          <MenuItem
            key={verb}
            value={verb}
            style={getStyles(verb, action, theme)}
          >
            <Checkbox checked={action.indexOf(verb) > -1} />
            {verb}
          </MenuItem>
        ))}
      </Select>
      <FormControl />
    </div>
  );
};

Legend.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Legend;
