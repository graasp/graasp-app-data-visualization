import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import { BoxLegendSvg } from '@nivo/legends';
import _ from 'lodash';
import Loader from '../../../../common/Loader';
import { HEIGHT, MARGIN, WIDTH, X_AXIS, Y_AXIS } from '../../../chartDesign';
import { getColorForScheme } from '../util';
import { DISABLED_COLOR } from '../../../../../config/settings';

const BarChart = ({ data, keys, indexBy, xAxis, yAxis, values, maxTicks }) => {
  const [hiddenKeys, setHiddenKeys] = useState([]);

  const colors = ({ id }) => {
    if (hiddenKeys.includes(id)) {
      return DISABLED_COLOR;
    }
    return getColorForScheme(id, keys);
  };

  const toggle = d => {
    let hidden = hiddenKeys;
    if (hiddenKeys.includes(d.id)) {
      hidden = hidden.filter(e => e !== d.id);
      setHiddenKeys(hidden);
    } else {
      hidden = [...hidden, d.id];
      hidden.sort((a, b) => (a > b ? 1 : -1));
      setHiddenKeys(hidden);
    }
  };

  const customLegend = d => {
    const { bars, height, width } = d;

    const keysProperties = keys
      .map(key => {
        const Obj = {};
        Obj.id = key;
        Obj.label = key;
        Obj.fill = hiddenKeys.includes(key)
          ? DISABLED_COLOR
          : colors({ id: key });
        Obj.itemTextColor = 'white';
        return Obj;
      })
      .reverse(); // reverse to display smaller amount legend on top

    bars.sort((a, b) => (a.key > b.key ? 1 : -1));
    const legend = {
      data: keysProperties,
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
    };

    return (
      <>
        <BoxLegendSvg
          data={legend.data}
          dataFrom={legend.dataFrom}
          anchor={legend.anchor}
          direction={legend.direction}
          justify={legend.justify}
          translateX={legend.translateX}
          translateY={legend.translateY}
          itemWidth={legend.itemWidth}
          itemHeight={legend.itemHeight}
          itemsSpacing={legend.itemsSpacing}
          symbolSize={legend.symbolSize}
          itemDirection={legend.itemDirection}
          symbolShape={legend.symbolShape}
          onClick={legend.onClick}
          effects={legend.effects}
          containerHeight={height}
          containerWidth={width}
        />
      </>
    );
  };

  if (data.length > 0 && keys && indexBy) {
    return (
      <div style={{ height: HEIGHT, width: WIDTH }}>
        <ResponsiveBar
          data={data}
          keys={_.difference(keys, hiddenKeys)}
          indexBy={indexBy}
          margin={MARGIN}
          padding={0.7}
          colors={colors}
          groupMode="stacked"
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={X_AXIS(xAxis, values, maxTicks)}
          axisLeft={Y_AXIS(yAxis)}
          enableLabel={false}
          animate
          motionStiffness={200}
          motionDamping={50}
          layers={['grid', 'bars', 'markers', 'axes', customLegend]}
        />
      </div>
    );
  }

  return <Loader />;
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  indexBy: PropTypes.string.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxTicks: PropTypes.number.isRequired,
};

export default BarChart;
