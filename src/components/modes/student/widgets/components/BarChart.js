import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../../../../common/Loader';

const BarChart = ({ data, keys, colors, indexBy, yAxis, xAxis }) => {
  if (data && keys && colors && indexBy) {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy={indexBy}
          margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
          padding={0}
          colors={bar => colors[bar.id]}
          groupMode="grouped"
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${xAxis}`,
            legendPosition: 'middle',
            legendOffset: 45,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${yAxis}`,
            legendPosition: 'middle',
            legendOffset: -40,
          }}
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
                id: 'changeAvg',
              },
              id: 'dots',
            },
            {
              match: {
                id: 'navigateAvg',
              },
              id: 'dots',
            },

            {
              match: {
                id: 'createAvg',
              },
              id: 'dots',
            },

            {
              match: {
                id: 'openAvg',
              },
              id: 'dots',
            },
          ]}
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
              symbolShape: 'circle',
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
