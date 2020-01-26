import React from 'react';

// https://codedaily.io/tutorials/79/Create-an-Animated-Circular-Progress-Indicator-to-Track-Article-Read-Percentage-in-React

const DIAMETER = 290;
const STROKE_WIDTH = 50;
const RADIUS = DIAMETER / 2 - STROKE_WIDTH / 2;
const CIRCUMFERENCE = Math.PI * RADIUS * 2;

const CircularProgress: React.FC<{
  progress: number;
  strokeColor: string;
}> = props => {
  const position = Math.max(100 - props.progress, 0);

  return (
    <div className="circular-progress">
      <svg
        viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
        width={DIAMETER}
        height={DIAMETER}
        className="circular-progress__svg"
      >
        <circle
          className="circular-progress__bg"
          cx={DIAMETER / 2}
          cy={DIAMETER / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          className="circular-progress__border"
          cx={DIAMETER / 2}
          cy={DIAMETER / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: (CIRCUMFERENCE * position) / 100
          }}
        />
      </svg>
      {props.children}
    </div>
  );
};

export default CircularProgress;
