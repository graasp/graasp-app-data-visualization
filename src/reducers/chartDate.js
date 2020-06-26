import { UPDATE_CHART_DATE } from '../types';

const chartDate = (state = [], { type, payload }) => {
  if (type === UPDATE_CHART_DATE) {
    return { ...state, from: payload.from, to: payload.to };
  }
  return state;
};

export default chartDate;
