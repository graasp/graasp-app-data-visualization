export const getVerbsTypesForBarChart = (actions, attributes) => {
  const verbs = [];
  let condition = [];
  if (attributes) {
    condition = attributes;
  }
  actions.forEach(action => {
    const { verb } = action;
    if (verb && !verbs.includes(verb) && !condition.includes(verb)) {
      verbs.push(verb);
      verbs.push(`${verb}Avg`);
    }
  });
  verbs.sort();
  return verbs;
};

export const formatDataForBarChart = (key, value, attribute) => {
  const data = [];
  key.forEach(entry => {
    const entryObj = {};
    entryObj[attribute] = entry;
    value.forEach(v => {
      entryObj[v] = 0;
    });
    data.push(entryObj);
  });

  return data;
};

function isActionInRange(data, createdAt) {
  return data.find(
    obj => obj.date === new Date(createdAt).toLocaleDateString(),
  );
}

function calculateAvg(verbs, data, nbOfUsers) {
  const verbsAvg = verbs.filter(e => e.indexOf('Avg') !== -1);
  data.forEach(e => {
    verbsAvg.forEach(verbAvg => {
      e[verbAvg] = (e[verbAvg] / nbOfUsers).toFixed(2);
    });
  });
  return data;
}

export const fillData = (actions, dataFormat, id, verbs, nbOfUsers) => {
  const data = dataFormat;
  actions.forEach(entry => {
    const { createdAt, verb, user } = entry;
    const correspondingObject = isActionInRange(data, createdAt);

    // if the action is done by this user in the date range chosen: Increment the type of verb that he had done
    if (user === id && verb && correspondingObject) {
      correspondingObject[verb] += 1;
      correspondingObject[`${verb}Avg`] += 1;
    }
    if (verb && correspondingObject && user !== id) {
      correspondingObject[`${verb}Avg`] += 1;
    }
  });
  return calculateAvg(verbs, data, nbOfUsers);
};

const isKeyInDataSelected = (dataSelected, key) => {
  return dataSelected.indexOf(key) !== -1;
};

export const AddSelectedAction = (dataObject, dataSelected) => {
  const updatedDataObject = {};
  updatedDataObject.date = dataObject.date;

  Object.keys(dataObject).forEach(key => {
    if (isKeyInDataSelected(dataSelected, key)) {
      updatedDataObject[key] = dataObject[key];
      updatedDataObject[`${key}Avg`] = dataObject[`${key}Avg`];
    }
  });
  return updatedDataObject;
};

export const displayTheSelectedData = (data, dataSelected) => {
  const updatedDataArray = [];

  data.forEach(entry => {
    const Obj = AddSelectedAction(entry, dataSelected);
    updatedDataArray.push(Obj);
  });
  return updatedDataArray;
};
