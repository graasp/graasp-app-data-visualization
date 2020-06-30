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

export const changeDateFormat = date => {
  return moment(date).format('DD/MM');
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
