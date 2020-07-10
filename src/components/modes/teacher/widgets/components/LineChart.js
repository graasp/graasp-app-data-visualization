import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import Loader from '../../../../common/Loader';
import { HEIGHT, MARGIN, WIDTH, X_AXIS, Y_AXIS } from '../../../chartDesign';

const LineChart = ({ data, colors, xAxis, yAxis, values, maxTicks }) => {
  const [hiddenKeys, setHiddenKeys] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filteredColor, setFilteredColor] = useState(colors);

  const enabledData = hidden => {
    const dataFiltered = [];
    const colorFiltered = {};
    data.forEach(d => {
      if (hidden.includes(d.id)) {
        const Obj = {};
        Obj.id = d.id;
        const ObjData = [];
        d.data.forEach(e => {
          ObjData.push({
            x: e.x,
            y: 0,
          });
        });
        Obj.data = ObjData;
        dataFiltered.push(Obj);
        colorFiltered[d.id] = 'grey';
      } else {
        dataFiltered.push(d);
        colorFiltered[d.id] = colors[d.id];
      }
    });
    setFilteredColor(colorFiltered);
    setFilteredData(dataFiltered);
  };

  useEffect(() => enabledData(hiddenKeys), [data]);
  const toggle = d => {
    let temp = hiddenKeys;
    if (!hiddenKeys.includes(d.id)) {
      temp.push(d.id);
      setHiddenKeys(temp);
    } else {
      temp = temp.filter(e => e !== d.id);
      setHiddenKeys(temp);
    }
    enabledData(temp);
  };

  if (data.length > 0) {
    return (
      <div style={{ height: HEIGHT, width: WIDTH }}>
        <ResponsiveLine
          data={filteredData}
          colors={bar => filteredColor[bar.id]}
          margin={MARGIN}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={X_AXIS(xAxis, values, maxTicks)}
          axisLeft={Y_AXIS(yAxis, data)}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh
          animate
          motionStiffness={200}
          motionDamping={50}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 121,
              translateY: 0,
              itemWidth: 84,
              itemHeight: 20,
              itemsSpacing: 11,
              symbolSize: 22,
              itemDirection: 'left-to-right',
              symbolShape: 'circle',
              onClick: toggle,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                    itemBackground: '#eee',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  }
  return <Loader />;
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.instanceOf(Object).isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxTicks: PropTypes.func.isRequired,
};

export default LineChart;
