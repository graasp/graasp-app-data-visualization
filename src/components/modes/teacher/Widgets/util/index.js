import moment from 'moment';

export const fillTheDates = (from, to) => {
  let dates = [];

  const fromTemp = new Date(from);
  const toTemp = new Date(to);

  while (fromTemp <= toTemp) {
    dates.push(fromTemp.toLocaleDateString());
    fromTemp.setDate(fromTemp.getDate() + 1);
  }

  dates = Array.from(dates);
  return dates;
};

export const Occurrence = (actions, property) => {
  const data = [];

  actions.forEach(action => {
    let entry = action[property];

    if (property === 'createdAt' || property === 'date') {
      entry = entry.slice(0, 10);
    }

    if (entry && !data.includes(entry)) {
      data.push(entry);
    }
  });

  data.sort();

  return data;
};

export const Frequency = (actions, property, condition) => {
  const data = {};

  if (actions && property && condition) {
    actions.forEach(action => {
      let entry = action[property];
      const cond = action[condition];

      if (property === 'createdAt' || property === 'date') {
        entry = entry.slice(0, 10);
      }

      if (entry)
        if (data[entry]) {
          if (!data[entry].includes(cond)) {
            const arr = data[entry];
            arr.push(cond);
            data[entry] = arr;
          }
        } else {
          data[entry] = [cond];
        }
    });

    return data;
  }
  if (actions && property) {
    actions.forEach(action => {
      let entry = action[property];

      if (property === 'createdAt' || property === 'date') {
        entry = entry.slice(0, 10);
      }

      if (entry)
        if (data[entry]) {
          data[entry] += 1;
        } else {
          data[entry] = 1;
        }
    });
  }

  return data;
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

export const changeDateFormat = date => {
  return moment(date).format('D/M');
};

export const changeDateFormatForBarChart = arr => {
  const newArr = [...arr];

  newArr.forEach(e => {
    const { date } = e;

    e.date = changeDateFormat(date);
  });
  return newArr;
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

export const createObjectForLine = (id, arr) => {
  const data = {};
  const dataArr = [];
  data.id = id;

  data.data = [];
  arr.forEach(e => {
    const Obj = {};

    const x = Object.keys(e)[0];

    Obj.x = x;

    Obj.y = e[x];

    dataArr.push(Obj);
  });

  data.data = dataArr;

  return data;
};

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

export const ChangePropertyNameOfObject = (Obj, property, newProperty) => {
  const newObj = {};

  Object.keys(Obj).forEach(key => {
    if (key !== property) {
      newObj[key] = Obj[key];
    } else {
      newObj[newProperty] = Obj[key];
    }
  });

  return newObj;
};

export const ChangePropertyNameOfObjectFromArray = (
  arr,
  property,
  newProperty,
) => {
  const newArr = [];

  arr.forEach(e => {
    const Obj = ChangePropertyNameOfObject(e, property, newProperty);
    newArr.push(Obj);
  });

  return newArr;
};

export const DataPicking = (actions, properties, conditions) => {
  const data = [];
  let attributes = [];
  if (conditions) {
    attributes = conditions;
  }
  actions.forEach(action => {
    const Obj = {};
    for (let i = 0; i < properties.length; i += 1) {
      const property = properties[i];
      const attribute = attributes[i];
      if (action[property]) {
        if (attribute && action[property] !== attribute) {
          break;
        }
        if (property === 'createdAt') {
          const date = new Date(action[property]);
          Obj[property] = date.toLocaleDateString();
        } else {
          Obj[property] = action[property];
        }
      } else {
        break;
      }
    }
    if (Object.keys(Obj).length === properties.length) {
      data.push(Obj);
    }
  });

  return data;
};
