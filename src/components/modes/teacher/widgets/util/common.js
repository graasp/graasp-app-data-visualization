import _ from 'lodash';
import moment from 'moment';
import { interpolateSpectral } from 'd3-scale-chromatic';
import { DATE_FORMAT_SHORT_YEAR } from '../../../../../config/settings';
import getComponentById from '../../../../../reducers/chartDataById';

export const fillTheDates = (from, to) => {
  let fromTmp = moment(from);
  const toTmp = moment(to);

  let dates = [];
  while (fromTmp.isSameOrBefore(toTmp)) {
    dates.push(fromTmp);
    fromTmp = moment(fromTmp).add(1, 'd');
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
  return moment(date).format(DATE_FORMAT_SHORT_YEAR);
};

export const changeDateFormatForArray = arr => {
  const temp = [];

  arr.forEach(e => {
    temp.push(changeDateFormat(e));
  });
  return temp;
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
        // filter
        if (attribute && action[property] !== attribute) {
          break;
        }
        // map
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

export const formatChunkDate = group =>
  group.length > 1 ? `${group[0]} - ${group[group.length - 1]}` : group[0];

// compute ideal nb of chunk from data
export const getChunkNb = (data, maxChartNb) => {
  return data.length > maxChartNb
    ? Math.ceil(data.length / maxChartNb)
    : data.length;
};

export const chunkArray = (data, maxChartNb) => {
  const chunkNb = getChunkNb(data, maxChartNb);
  let chunks = _.chunk(data, chunkNb);
  if (chunks[0]?.length === data.length) {
    chunks = chunks.flat();
  }
  return chunks;
};

// chunk dates to match chunk data
export const formatDates = (dates, maxChartNb) => {
  const newDates = dates.map(date => date.format(DATE_FORMAT_SHORT_YEAR));
  let tmp = chunkArray(newDates, maxChartNb);
  if (Array.isArray(tmp[0])) {
    tmp = tmp.map(formatChunkDate);
  }
  return tmp;
};

// chunk data in group to display less barcharts
export const chunkData = (defaultValues, data, maxChartNb) => {
  return chunkArray(data, maxChartNb).map(group => {
    if (Array.isArray(group)) {
      const values = group.reduce((acc, d) => {
        // increment keys for each value
        Object.keys(d).forEach(k => {
          acc[k] = acc[k] ? acc[k] + d[k] : d[k];
        });
        return acc;
      }, {});
      // format date to from - to format
      const date = formatChunkDate(group.map(({ date: d }) => d));
      return { ...defaultValues, ...values, date };
    }

    return group;
  });
};

export const getUniqueVerbs = content => {
  return [...new Set(content.map(({ verb }) => verb).filter(Boolean))];
};

export const getColorForScheme = (t, values) => {
  const idx = values.indexOf(t);
  return interpolateSpectral(idx / parseFloat(values.length));
};
