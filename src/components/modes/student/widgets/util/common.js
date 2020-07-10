import moment from 'moment';
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
  const fromTemp = new Date(from);
  const toTemp = new Date(to);
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

export const filterVerbs = (verbList, list) => {
  let filteredList = [];
  verbList.forEach(verb => {
    if (list.indexOf(verb) === -1) {
      filteredList = [...filteredList, verb];
    }
  });

  return filteredList;
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

export const RemovePropertyOfObjectFromArray = (arr, property) => {
  const newArr = [];

  arr.forEach(e => {
    const Obj = RemovePropertyOfObject(e, property);
    newArr.push(Obj);
  });

  return newArr;
};

export const RemoveAttributeOfObject = (Obj, property) => {
  const newObj = {};

  Object.keys(Obj).forEach(key => {
    if (key !== property) {
      newObj[key] = Obj[key];
    }
  });

  return newObj;
};

export const RemoveObjectWithAttributeFromArray = (
  arr,
  property,
  attribute,
) => {
  const newArr = [];

  arr.forEach(e => {
    if (!attribute.includes(e[property])) {
      newArr.push(e);
    }
  });

  return newArr;
};

export const changeDateFormat = date => {
  return moment(date).format('DD/MM');
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
    temp.push(changeDateFormat(new Date(e)));
  });
  return temp;
};

export const nbOfTicks = (
  arrayOfTickValues,
  arrayOfBreakpoints,
  windowsSize,
) => {
  let tick = 0;

  for (let i = arrayOfBreakpoints.length; i >= 0; i -= 1) {
    if (windowsSize <= arrayOfBreakpoints[i]) {
      tick = arrayOfTickValues[i];
    }
  }

  return tick;
};
