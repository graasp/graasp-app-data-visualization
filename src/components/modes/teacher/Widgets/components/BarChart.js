import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';

import Loader from '../../../../common/Loader';

const BarChart = ({ data, keys, colors, indexBy, xAxis, yAxis }) => {
  const [hiddenKeys, setHiddenKeys] = useState([]);
  // const [shownKeys,setShownKeys] = useState(keys);
  const [filteredData, setFilteredData] = useState(data);

  const enabledData = hidden => {
    const dataFilter = [];
    let temp = [];
    if (hidden) {
      temp = hidden;
    }
    data.forEach(d => {
      const Obj = {};
      Object.keys(d).forEach(key => {
        Obj[key] = d[key];
        if (temp.includes(key)) {
          Obj[key] = 0.01;
        }
      });

      dataFilter.push(Obj);
    });

    setFilteredData(dataFilter);
  };

  useEffect(enabledData, [data]);
  // useEffect(()=> (setShownKeys(keys)),[keys])

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
    // if(shownKeys.includes(d.id)){
    //   setShownKeys(shownKeys.filter(e => e!==d.id))
    // }
    // else{
    //   setShownKeys([...hiddenKeys,d])
    // }
  };

  if (data && keys && colors && indexBy) {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveBar
          data={filteredData}
          keys={keys}
          indexBy={indexBy}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.7}
          colors={bar => colors[bar.id]}
          groupMode="stacked"
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#ffffff',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#ffffff',
              rotation: 32,
              lineWidth: 4,
              spacing: 7,
            },
          ]}
          fill={[
            {
              match: {
                id: 'change',
              },
              id: 'dots',
            },
            {
              match: {
                id: 'unload',
              },
              id: 'lines',
            },
          ]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: `${xAxis}`,
            legendPosition: 'middle',
            legendOffset: 30,
          }}
          axisLeft={{
            format: e => Math.floor(e) === e && e,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${yAxis}`,
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={6}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              data: keys.map(id => {
                return {
                  id,
                  label: id,
                  color: colors[id],
                };
              }),
              dataFrom: 'keys',
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
          animate
          motionStiffness={200}
          motionDamping={50}
        />
      </div>
    );
  }

  return <Loader />;
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.instanceOf(Object).isRequired,
  indexBy: PropTypes.string.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
};

export default BarChart;
