import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import Loader from '../../../../common/Loader';
import { HEIGHT, MARGIN, WIDTH, X_AXIS, Y_AXIS } from '../../../chartDesign';
import { DISABLED_COLOR } from '../../../../../config/settings';

const LineChart = ({ data, colors, xAxis, yAxis, values, maxTicks }) => {
  const { t } = useTranslation();
  const [hiddenKeys, setHiddenKeys] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filteredColor, setFilteredColor] = useState(colors);
  const activity = Boolean(
    useSelector(({ appInstanceResources }) => appInstanceResources.activity)
      .length,
  );

  const enabledData = useCallback(
    hidden => {
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
          colorFiltered[d.id] = DISABLED_COLOR;
        } else {
          dataFiltered.push(d);
          colorFiltered[d.id] = colors[d.id];
        }
      });
      setFilteredColor(colorFiltered);
      setFilteredData(dataFiltered);
    },
    [colors, data],
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

  if (activity) {
    return <Loader />;
  }

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
  return t('Data is not available at the moment');
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
