import { Frequency } from './common';

export const TotalAccesses = (arr, scale, dates) => {
  const data = [...dates];

  const dateFrequency = Frequency(arr, 'date');

  return data.map(date => {
    const dateF = date.format('DD/MM/YYYY');
    const dateChart = date.format('DD/MM/YY');
    return { [dateChart]: dateFrequency[dateF] || 0 };
  });
};

export const UniqueAccesses = (arr, scale, property, dates) => {
  const data = [...dates];

  const dateFrequency = Frequency(arr, 'date', property);

  return data.map(date => {
    const dateF = date.format('DD/MM/YYYY');
    const dateChart = date.format('DD/MM/YY');
    return { [dateChart]: dateFrequency[dateF]?.length || 0 };
  });
};
