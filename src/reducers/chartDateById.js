import { makeMultiGetter, makeMultiReducer } from 'dextrous';
import chartDate from './chartDate';

const chartDateById = makeMultiReducer(chartDate);
export default chartDateById;

export const getDateById = makeMultiGetter(chartDate);
