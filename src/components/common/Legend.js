import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import updateLegendById from '../../actions/chartLegendById';
import { getUniqueVerbs } from '../modes/teacher/widgets/util';

const Legend = ({ id, verbList }) => {
  const [action, setAction] = useState([...verbList]);
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
        <FormControlLabel
          value={verb}
          key={verb}
          control={<Checkbox color="primary" />}
          label={verb}
          onClick={handleChange}
          style={{ width: 104, marginRight: '1.5vw', marginLeft: '1.5vw' }}
          checked={action.includes(verb)}
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
  verbList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ action: { content }, appInstance }) => {
  const hiddenVerbs = appInstance?.content?.settings?.hiddenVerbs || [];
  const verbList = _.difference(getUniqueVerbs(content), hiddenVerbs).sort();
  return {
    actions: content,
    verbList,
  };
};

export default connect(mapStateToProps)(Legend);
