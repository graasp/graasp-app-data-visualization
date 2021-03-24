import { AVG, MAX, USER } from '../types';

export const formatDataForOMeter = (properties = [], key, attribute) => {
  const entryObj = {};
  if (key && attribute) {
    entryObj[attribute] = key;
  }
  properties.forEach(property => {
    entryObj[property] = 0;
  });
  return entryObj;
};

export const fillDataActionByUser = (actions, usersList, verbList) => {
  actions.forEach(action => {
    const { user, verb } = action;
    if (verbList.includes(verb)) {
      const correspondingObject = usersList.find(obj => obj.user === user);
      correspondingObject[verb] += 1;
    }
  });
  return usersList;
};

export const calculateAverage = (data, nbOfUsers) => {
  const Obj = data;
  Obj[AVG] = (Obj[AVG] / nbOfUsers).toFixed(2);
  return Obj;
};

export const sumActionByWeight = (data, allowedVerbs) => {
  const Obj = {};

  data.forEach(d => {
    const { user } = d;
    Obj[user] = 0;
    allowedVerbs.forEach(verb => {
      Obj[user] += d[verb];
    });
  });
  return Obj;
};

export const formatDataForOMeterVerb = (
  formattedData,
  userId,
  students,
  chartProperties,
) => {
  const Obj = formatDataForOMeter(chartProperties);
  const arr = Object.values(formattedData);
  Obj[MAX] = Math.max(...arr);
  Obj[USER] = formattedData[userId];

  students.forEach(student => {
    Obj[AVG] += formattedData[student];
  });

  const avg = Obj[AVG];

  Obj[AVG] = Number(avg / students.length).toFixed(2);
  return Obj;
};
