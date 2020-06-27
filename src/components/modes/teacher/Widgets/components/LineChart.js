import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';

import Loader from '../../../../common/Loader';

const LineChart = ({ data, colors, xAxis, yAxis }) => {
  const maxY = d => {
    const Max = [];

    d.forEach(entry => {
      Max.push(
        Math.max(
          ...entry.data.map(o => {
            return o.y;
          }),
        ),
      );
    });

    return Math.max(...Max);
  };

  const tickValue = () => {
    return Array.from(Array(maxY(data) + 1).keys());
  };

  if (data.length > 0 && colors) {
    return (
      <div style={{ height: 500 }}>
        <ResponsiveLine
          data={data}
          colors={{ scheme: 'nivo' }}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: `${xAxis}`,
            legendPosition: 'middle',
            legendOffset: 30,
          }}
          axisLeft={{
            tickValues: tickValue(),
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${yAxis}`,
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh
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
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
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
  colors: PropTypes.func.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
};

export default LineChart;
