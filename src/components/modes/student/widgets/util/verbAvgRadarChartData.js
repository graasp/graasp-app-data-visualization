/* eslint-disable no-param-reassign */
export const getVerbsTypesForRadar = actions => {
  const verbs = [];
  actions.forEach(action => {
    const { verb } = action;
    if (verb && !verbs.includes(verb)) {
      verbs.push(verb);
    }
  });
  verbs.sort();
  return verbs;
};

export const formatDataForRadar = (key, value, attribute) => {
  const data = [];
  key.forEach(entry => {
    const entryObj = {};
    entryObj[attribute] = entry;
    entryObj.user = 0;
    entryObj.avg = 0;
    data.push(entryObj);
  });
  return data;
};

export const fillDataForRadar = (
  actions,
  dataFormat,
  id,
  dateRange,
  nbOfUsers,
) => {
  actions.forEach(entry => {
    const { createdAt, verb, userId } = entry;
    const correspondingObject = dateRange.find(
      date => date === new Date(createdAt).toLocaleDateString(),
    );

    const verbObj = dataFormat.find(obj => obj.verb === verb);
    if (userId === id && verb && correspondingObject) {
      verbObj.user += 1;
      verbObj.avg += 1;
    }
    if (verb && correspondingObject) {
      verbObj.avg += 1;
    }
  });

  dataFormat.forEach(verbs => {
    verbs.avg /= nbOfUsers;
  });

  return dataFormat;
};
