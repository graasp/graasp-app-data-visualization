import { AVG, USER } from '../types/attributes';

export const formatDataForRadar = (key, attribute, properties = []) => {
  const data = [];
  key.forEach(entry => {
    const entryObj = {};
    entryObj[attribute] = entry;
    properties.forEach(property => {
      entryObj[property] = 0;
    });
    data.push(entryObj);
  });
  return data;
};

const isActionInRange = (dateRange, createdAt) => {
  return dateRange.find(
    date => date === new Date(createdAt).toLocaleDateString(),
  );
};

function calculateAverage(dataFormat, nbOfUsers) {
  dataFormat.forEach(e => {
    e[AVG] /= nbOfUsers;
  });

  return dataFormat;
}

export const fillDataForRadar = (
  actions,
  dataFormat,
  id,
  dateRange,
  verbList,
  nbOfUsers,
) => {
  actions.forEach(entry => {
    const { createdAt, verb, userId } = entry;
    if (verbList.includes(verb)) {
      const correspondingObject = isActionInRange(dateRange, createdAt);
      const verbObj = dataFormat.find(obj => obj.verb === verb);
      if (userId === id && verb && correspondingObject) {
        verbObj[USER] += 1;
        verbObj[AVG] += 1;
      }
      if (verb && correspondingObject && userId !== id) {
        verbObj[AVG] += 1;
      }
    }
  });

  return calculateAverage(dataFormat, nbOfUsers);
};
