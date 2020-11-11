import moment from 'moment';
import { DATE_FORMAT_SHORT_YEAR } from '../../../../../config/settings';

export const createDataForBarChart = (key, value, property) => {
  const data = [];
  key.forEach(e => {
    const Obj = {};
    Obj[property] = e;

    value.forEach(v => {
      Obj[v] = 0;
    });

    data.push(Obj);
  });

  return data;
};

export const changeDateFormatForBarChart = arr => {
  const newArr = [...arr];

  newArr.forEach(e => {
    const { date } = e;

    e.date = date.format(DATE_FORMAT_SHORT_YEAR);
  });
  return newArr;
};

export const fillDataForBarChart = (actions, dataFormat) => {
  const data = dataFormat.map(({ date }) => {
    const dateString = date.format(DATE_FORMAT_SHORT_YEAR);
    const correspondingActions = actions.filter(
      ({ createdAt, verb }) =>
        moment(createdAt).format(DATE_FORMAT_SHORT_YEAR) === dateString && verb,
    );
    const reduceKeys = correspondingActions.reduce((acc, { verb }) => {
      acc[verb] = acc[verb] ? acc[verb] + 1 : 1;
      return acc;
    }, {});
    return { date, ...reduceKeys };
  });
  return data;
};
