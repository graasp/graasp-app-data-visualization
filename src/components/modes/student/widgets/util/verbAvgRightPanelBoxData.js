import { AVG, USER } from '../types';

export const pp = () => {};

function calculateAverage(dataFormat, nbOfUsers) {
  dataFormat.forEach(e => {
    e[AVG] = (e[AVG] / nbOfUsers).toFixed(2);
  });
  return dataFormat;
}

export const fillDataForRightPanelBox = (
  actions,
  dataFormat,
  id,
  verbList,
  nbOfUsers,
) => {
  actions.forEach(entry => {
    const { verb, user } = entry;
    if (verbList.includes(verb)) {
      const verbObj = dataFormat.find(obj => obj.verb === verb);
      if (user === id && verb) {
        verbObj[USER] += 1;
        verbObj[AVG] += 1;
      }
      if (verb && user !== id) {
        verbObj[AVG] += 1;
      }
    }
  });

  return calculateAverage(dataFormat, nbOfUsers);
};
