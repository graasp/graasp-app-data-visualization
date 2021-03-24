import React from 'react';
import PropTypes from 'prop-types';
import ReactSpeedometer from 'react-d3-speedometer';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AVG, MAX, USER } from '../types';

const SpeedOMeter = ({ value, colors, segments }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const currentValue = () => {
    return value[USER] || 0;
  };

  const stops = () => {
    const arr = [];

    arr.push(0);
    arr.push(Number(value[AVG]));
    arr.push(value[MAX]);

    return arr;
  };

  const width = matches ? window.innerWidth : window.innerWidth / 2;

  if (value[MAX] !== 0 && value[MAX]) {
    return (
      <div>
        <div style={{ height: width / 2 }}>
          <ReactSpeedometer
            height={width / 2 + 30}
            fluidWidth
            forceRender
            maxValue={value[MAX]}
            segments={segments}
            segmentColors={colors}
            customSegmentStops={stops()}
            value={currentValue()}
            needleHeightRatio={0.8}
            needleColor="#BBAAFF"
            needleTransitionDuration={4000}
            needleTransition="easeElastic"
          />
        </div>
        <Typography variant="body1" display="block" gutterBottom>
          {`Your participation: ${value[USER] || 0}`}
        </Typography>
        <Typography variant="body1" display="block" gutterBottom>
          {`Average participation: ${value[AVG]}`}
        </Typography>
        <Typography variant="body1" display="block" gutterBottom>
          {`Maximum participation: ${value[MAX]}`}
        </Typography>
      </div>
    );
  }
  return <div>No occurrence of this action</div>;
};

SpeedOMeter.propTypes = {
  value: PropTypes.instanceOf(Object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  segments: PropTypes.number.isRequired,
};

export default SpeedOMeter;
