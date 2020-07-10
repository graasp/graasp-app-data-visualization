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
      e[verbAvg] /= nbOfUsers;
    });
  });
  return data;
}

export const fillData = (actions, dataFormat, id, verbs, nbOfUsers) => {
  const data = dataFormat;
  actions.forEach(entry => {
    const { createdAt, verb, userId } = entry;
    const correspondingObject = isActionInRange(data, createdAt);

    // if the action is done by this user in the date range chosen: Increment the type of verb that he had done
    if (userId === id && verb && correspondingObject) {
      correspondingObject[verb] += 1;
      correspondingObject[`${verb}Avg`] += 1;
    }
    if (verb && correspondingObject && userId !== id) {
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

const createAggregateDataObject = (userKeyName, avgKeyName, dataObject) => {
  const updatedDataObject = {};
  updatedDataObject[userKeyName] = 0;
  updatedDataObject[avgKeyName] = 0;
  updatedDataObject.date = dataObject.date;
  return updatedDataObject;
};

function addTotalAction(actionsInaDay, userKeyName, avgKeyName) {
  const aggregateDataObject = createAggregateDataObject(
    userKeyName,
    avgKeyName,
    actionsInaDay,
  );
  Object.keys(actionsInaDay).forEach(key => {
    if (key !== 'date') {
      if (key.indexOf('Avg') === -1) {
        aggregateDataObject[userKeyName] += actionsInaDay[key];
      } else {
        aggregateDataObject[avgKeyName] += actionsInaDay[key];
      }
    }
  });
  return aggregateDataObject;
}

export const aggregateData = (actionsInDataRange, userKeyName, avgKeyName) => {
  const updatedDataArray = [];
  actionsInDataRange.forEach(actionsInaDay => {
    updatedDataArray.push(
      addTotalAction(actionsInaDay, userKeyName, avgKeyName),
    );
  });
  return updatedDataArray;
};
