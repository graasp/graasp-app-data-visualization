import { changeDateFormat } from './common';

export const changeDateFormatForLineChart = arr => {
  const newArr = [...arr];

  newArr.forEach(entry => {
    const { data } = entry;

    data.forEach(e => {
      const { x } = e;

      e.x = changeDateFormat(x);
    });
  });
  return newArr;
};

export const createObjectForLine = (id, arr) => {
  const data = {};
  const dataArr = [];
  data.id = id;

  data.data = [];
  arr.forEach(e => {
    const x = Object.keys(e)[0];
    dataArr.push({ x, y: e[x] });
  });
  data.data = dataArr;

  return data;
};
