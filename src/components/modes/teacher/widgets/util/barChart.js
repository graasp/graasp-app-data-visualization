import { changeDateFormat } from './common';

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

    e.date = changeDateFormat(date);
  });
  return newArr;
};

export const fillDataForBarChart = (actions, dataFormat) => {
  const data = dataFormat;
  actions.forEach(e => {
    const { createdAt, verb } = e;
    const correspondingObject = data.find(
      obj => obj.date === new Date(createdAt).toLocaleDateString(),
    );

    if (verb && correspondingObject) {
      correspondingObject[verb] += 1;
    }
  });
  return data;
};
