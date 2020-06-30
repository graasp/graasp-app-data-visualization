import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { Occurrence, filterVerbs } from '../modes/student/widgets/util';
import { VERB } from '../modes/student/widgets/types/types';
import updateLegendById from '../../actions/chartLegendById';

const filteredVerbs = ['access', 'cancel', 'login', 'logout', 'unload'];
const Legend = ({ id }) => {
  const actions = useSelector(state => state.action.content);
  let verbList = Occurrence(actions, VERB);
  verbList = filterVerbs(verbList, filteredVerbs);
  const [action, setAction] = useState([]);
  const dispatch = useDispatch();

  const handleChange = event => {
    if (!action.includes(event.target.value)) {
      setAction([...action, event.target.value]);
    } else {
      setAction(
        action.filter(actionEntry => actionEntry !== event.target.value),
      );
    }
  };

  useEffect(() => {
    dispatch(updateLegendById(action, id));
  }, [action]);

  const renderVerbList = () => {
    if (verbList.length !== 0) {
      return verbList.map(verb => (
        <div key={verb}>
          <FormControlLabel
            value={verb}
            control={<Checkbox color="primary" />}
            label={verb}
            labelPlacement="top"
            onClick={handleChange}
          />
        </div>
      ));
    }
    return <Loader />;
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          {renderVerbList()}
        </FormGroup>
      </FormControl>
    </div>
  );
};

Legend.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Legend;
