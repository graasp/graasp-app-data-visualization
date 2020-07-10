import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import updateLegendById from '../../actions/chartLegendById';

const Legend = ({ id }) => {
  /** The comments below are used in case you what to show all the verbs in a specific learning space or filter some verbs
   In our case we decided to show only the action in verb list
   Otherwise uncomment these line and import the methods -> You will get all the actions occurred in this space and you do can some filtering */
  /* const actions = useSelector(state => state.action.content);
   const filteredVerbs = ['access', 'cancel', 'login', 'logout', 'unload'];
   let verbList = Occurrence(actions, VERB);
   verbList = filterVerbs(verbList, filteredVerbs); */

  const verbList = ['navigate', 'change', 'create', 'open'];
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
      return verbList
        .reverse()
        .map(verb => (
          <FormControlLabel
            value={verb}
            key={verb}
            control={<Checkbox color="primary" />}
            label={verb}
            onClick={handleChange}
            style={{ width: 104, marginRight: '1.5vw', marginLeft: '1.5vw' }}
          />
        ));
    }
    return <div />;
  };

  return (
    <FormControl id={id} component="fieldset">
      <FormGroup aria-label="position" row>
        {renderVerbList()}
      </FormGroup>
    </FormControl>
  );
};

Legend.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Legend;
