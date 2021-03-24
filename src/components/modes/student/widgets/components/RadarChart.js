import React, { useEffect, useState, useCallback } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import PropTypes from 'prop-types';
import Loader from '../../../../common/Loader';
import { DISABLED_COLOR } from '../../../../../config/settings';

const RadarChart = ({ data, colors, keys, indexBy }) => {
  const [hiddenKeys, setHiddenKeys] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filteredColor, setFilteredColor] = useState(colors);

  const enabledData = useCallback(
    hidden => {
      const dataFiltered = [];
      const colorFiltered = {};

      data.forEach(d => {
        const Obj = {};
        Obj[indexBy] = d[indexBy];
        keys.forEach(key => {
          if (hidden.includes(key)) Obj[key] = 0;
          else {
            Obj[key] = d[key];
          }
        });
        dataFiltered.push(Obj);
      });
      keys.forEach(key => {
        if (hidden.includes(key)) {
          colorFiltered[key] = DISABLED_COLOR;
        } else {
          colorFiltered[key] = colors[key];
        }
      });
      setFilteredColor(colorFiltered);
      setFilteredData(dataFiltered);
    },
    [colors, data, indexBy, keys],
  );

  useEffect(() => enabledData(hiddenKeys), [data, enabledData, hiddenKeys]);

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

  if (!colors) {
    return <Loader />;
  }

  return (
    <div style={{ height: 400 }}>
      <ResponsiveRadar
        data={filteredData}
        keys={keys}
        indexBy={indexBy}
        colors={bar => filteredColor[bar.key]}
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 50, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={8}
        gridShape="circular"
        gridLabelOffset={18}
        enableDots
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        dotLabel="value"
        dotLabelYOffset={-12}
        fillOpacity={0.3}
        blendMode="multiply"
        animate
        motionStiffness={90}
        motionDamping={15}
        isInteractive
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            translateX: -80,
            translateY: -40,
            itemWidth: 84,
            itemHeight: 20,
            itemsSpacing: 11,
            symbolSize: 22,
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
};

RadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.instanceOf(Object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  indexBy: PropTypes.string.isRequired,
};

export default RadarChart;
