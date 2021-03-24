import moment from 'moment';
import { DATE_FORMAT_SHORT_YEAR } from '../../../../../config/settings';
import getComponentById from '../../../../../reducers/chartDataById';

export const fromDate = (chartDataById, id) => {
  if (chartDataById) {
    const componentByIdElement = getComponentById(chartDataById, id)[id];
    if (componentByIdElement) {
      return componentByIdElement.from;
    }
  }
  return undefined;
};

export const toDate = (chartDataById, id) => {
  if (chartDataById) {
    const componentByIdElement = getComponentById(chartDataById, id)[id];
    if (componentByIdElement) {
      return componentByIdElement.to;
    }
  }
  return undefined;
};

export const selectedActions = (chartDataById, id) => {
  if (chartDataById) {
    const componentByIdElement = getComponentById(chartDataById, id)[id];
    if (componentByIdElement) {
      return componentByIdElement.payload;
    }
  }
  return [];
};

export const buildDateRange = (from, to) => {
  const dates = [];
  const fromTemp = from;
  const toTemp = to;
  while (fromTemp <= toTemp) {
    dates.push(fromTemp.toLocaleDateString());
    fromTemp.setDate(fromTemp.getDate() + 1);
  }
  return dates;
};

export const Occurrence = (actions, property, attributes) => {
  const data = [];
  let condition = [];
  if (attributes) {
    condition = attributes;
  }
  actions.forEach(action => {
    let entry = action[property];

    if (property === 'createdAt' || property === 'date') {
      entry = entry.slice(0, 10);
    }

    if (entry && !data.includes(entry) && !condition.includes(entry)) {
      data.push(entry);
    }
  });

  data.sort();

  return data;
};

export const RemovePropertyOfObject = (Obj, property) => {
  const newObj = {};

  Object.keys(Obj).forEach(key => {
    if (key !== property) {
      newObj[key] = Obj[key];
    }
  });

  return newObj;
};

export const changeDateFormat = date => {
  return moment(date).format(DATE_FORMAT_SHORT_YEAR);
};

export const changeDateFormatForBarChart = dataArray => {
  const updatedDataArray = [...dataArray];

  updatedDataArray.forEach(e => {
    const { date } = e;

    e.date = changeDateFormat(date);
  });
  return updatedDataArray;
};

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

export const changeDateFormatForArray = arr => {
  const temp = [];

  arr.forEach(e => {
    temp.push(changeDateFormat(e));
  });
  return temp;
};

export const nbOfTicks = ({ componentWidth, labelWidth, margin = 0 }) => {
  return Math.max(Math.floor((componentWidth - margin) / labelWidth) - 1, 1);
};
