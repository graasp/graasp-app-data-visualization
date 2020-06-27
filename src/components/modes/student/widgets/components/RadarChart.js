import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import PropTypes from 'prop-types';

const RadarChart = ({ data }) => {
  return (
    <div style={{ height: 500 }}>
      <ResponsiveRadar
        data={data}
        keys={['user', 'avg']}
        indexBy="verb"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate
        motionStiffness={90}
        motionDamping={15}
        isInteractive
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
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
};

export default RadarChart;
