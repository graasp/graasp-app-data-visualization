import { UPDATE_CHART_DATE } from '../types';

const updateDate = (from, to) => dispatch =>
  dispatch({
    type: UPDATE_CHART_DATE,
    payload: {
      from,
      to,
    },
  });

export default updateDate;
