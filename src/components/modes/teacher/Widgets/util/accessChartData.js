import { Frequency } from './common';

export const TotalAccesses = (arr, scale, dates) => {
  const data = [];

  const dateFrequency = Frequency(arr, 'date');

  const dateFrequencyKeys = Object.keys(dateFrequency);

  dates.forEach(date => {
    const Obj = {};

    Obj[date] = 0;
    if (dateFrequencyKeys.includes(date)) {
      Obj[date] = dateFrequency[date];
    }

    data.push(Obj);
  });

  return data;
};

export const UniqueAccesses = (arr, scale, property, dates) => {
  const data = [];

  const dateFrequency = Frequency(arr, 'date', property);

  const dateFrequencyKeys = Object.keys(dateFrequency);

  dates.forEach(date => {
    const Obj = {};

    Obj[date] = 0;
    if (dateFrequencyKeys.includes(date)) {
      Obj[date] = dateFrequency[date].length;
    }

    data.push(Obj);
  });

  return data;
};
