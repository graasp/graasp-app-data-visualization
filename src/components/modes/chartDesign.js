export const xTickValues = (values, tickCount) => {
  const l = values.length;

  // keep all values if it's less than necessary
  if (l < tickCount) {
    return values;
  }

  // display no tick
  if (tickCount === 1) {
    return [];
  }

  // keep first value
  const temp = [values[0]];

  const step = Math.ceil(l / tickCount);

  // keep middle values every step
  const middleValues = values.slice(step, -step);
  for (let i = 0; i < middleValues.length; i += step) {
    temp.push(middleValues[i]);
  }

  // keep last value
  temp.push(values[l - 1]);

  return temp;
};

// const tickValueY = data => {
//   const Max = [];
//
//   data.forEach(entry => {
//     Max.push(
//       Math.max(
//         ...entry.data.map(o => {
//           return o.y;
//         }),
//       ),
//     );
//   });
//
//   return Array.from(Array(Math.max(...Max) + 1).keys());
// };

export const HEIGHT = 400;
export const WIDTH = '100%';
export const MARGIN = { top: 50, right: 110, bottom: 60, left: 60 };
export const X_AXIS = (legend, values, tickCount) => ({
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: `${legend}`,
  legendPosition: 'middle',
  legendOffset: 45,
  tickValues: xTickValues(values, tickCount),
});

export const Y_AXIS = (legend, data) => {
  if (legend && data) {
    return {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: `${legend}`,
      legendOffset: -40,
      legendPosition: 'middle',
      // tickValues: tickValueY(data),
    };
  }
  return {
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: `${legend}`,
    legendOffset: -40,
    legendPosition: 'middle',
  };
};
