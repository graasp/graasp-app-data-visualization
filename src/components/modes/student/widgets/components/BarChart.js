import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../../../../common/Loader';

const BarChart = ({ data, keys, colors, indexBy, yAxis, xAxis }) => {
  if (data && keys && colors && indexBy) {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveBar
          data={data}
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
                id: 'navigate',
              },
              id: 'dots',
            },

            {
              match: {
                id: 'create',
              },
              id: 'dots',
            },

            {
              match: {
                id: 'open',
              },
              id: 'dots',
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
