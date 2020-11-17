import {
  DATE_FORMAT_FULL_YEAR,
  DATE_FORMAT_SHORT_YEAR,
} from '../../../../../config/settings';
import { Frequency } from './common';

export const TotalAccesses = (arr, scale, dates) => {
  const data = [...dates];

  const dateFrequency = Frequency(arr, 'date');

  return data.map(date => {
    const dateF = date.format(DATE_FORMAT_FULL_YEAR);
    const dateChart = date.format(DATE_FORMAT_SHORT_YEAR);
    return { [dateChart]: dateFrequency[dateF] || 0 };
  });
};

export const UniqueAccesses = (arr, scale, property, dates) => {
  const data = [...dates];

  const dateFrequency = Frequency(arr, 'date', property);

  return data.map(date => {
    const dateF = date.format(DATE_FORMAT_FULL_YEAR);
    const dateChart = date.format(DATE_FORMAT_SHORT_YEAR);
    return { [dateChart]: dateFrequency[dateF]?.length || 0 };
  });
};
