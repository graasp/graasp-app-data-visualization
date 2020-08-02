import { AVG, TOTAL } from '../types';

function calculateAvg(data, nbOfUsers) {
  const correspondingObject = data.find(obj => obj.id === AVG);

  correspondingObject.data.forEach(e => {
    e.y = (e.y / nbOfUsers).toFixed(2);
  });
  return data;
}

export const fillDataForLineChart = (
  actions,
  dataFormat,
  id,
  nbOfUsers,
  selectedActions,
) => {
  const d = dataFormat;
  actions.forEach(entry => {
    const { createdAt, verb, user } = entry;

    if (verb) {
      if (selectedActions.includes(verb)) {
        if (id === user) {
          const correspondingObject = d.find(obj => obj.id === TOTAL);

          const { data } = correspondingObject;

          const correspondingDate = data.find(
            obj => obj.x === new Date(createdAt).toLocaleDateString(),
          );

          if (correspondingDate) {
            correspondingDate.y += 1;
          }
        }
        const correspondingObject = d.find(obj => obj.id === AVG);

        const { data } = correspondingObject;

        const correspondingDate = data.find(
          obj => obj.x === new Date(createdAt).toLocaleDateString(),
        );

        if (correspondingDate) {
          correspondingDate.y += 1;
        }
      }
    }
  });

  return calculateAvg(d, nbOfUsers);
};

export const formatDataForLineChart = (dateRange, arr) => {
  const data = [];

  arr.forEach(id => {
    const Obj = {};

    Obj.id = id;

    const d = [];

    dateRange.forEach(date => {
      const e = {};
      e.x = date;
      e.y = 0;

      d.push(e);
    });

    Obj.data = d;
    data.push(Obj);
  });
  return data;
};
