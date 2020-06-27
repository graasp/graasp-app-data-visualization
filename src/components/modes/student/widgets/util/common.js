export const buildDateRange = (fromDate, toDate) => {
  let dates = [];
  const fromTemp = new Date(fromDate);
  const toTemp = new Date(toDate);
  while (fromTemp <= toTemp) {
    dates.push(fromTemp.toLocaleDateString());
    fromTemp.setDate(fromTemp.getDate() + 1);
  }
  dates = Array.from(dates);
  return dates;
};

export const Occurrence = (actions, attribute) => {
  const data = [];
  actions.forEach(action => {
    let entry = action[attribute];
    if (attribute === 'createdAt') {
      entry = entry.slice(0, 10);
    }
    if (entry && !data.includes(entry)) {
      data.push(entry);
    }
  });
  data.sort();
  return data;
};
