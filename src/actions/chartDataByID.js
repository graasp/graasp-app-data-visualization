import { UPDATE_CHART_DATE } from '../types';

const updateDateById = (from, to, id) => dispatch =>
  dispatch({
    type: UPDATE_CHART_DATE,
    payload: {
      from,
      to,
    },
    key: id,
  });

export default updateDateById;
