import React from 'react';

// https://codedaily.io/tutorials/79/Create-an-Animated-Circular-Progress-Indicator-to-Track-Article-Read-Percentage-in-React

const DIAMETER = window.innerWidth < 768 ? 290 : 290 * 1.5;
const STROKE_WIDTH = window.innerWidth < 768 ? 50 : 50 * 1.25;
const RADIUS = DIAMETER / 2 - STROKE_WIDTH / 2;
const CIRCUMFERENCE = Math.PI * RADIUS * 2;

const CircularProgress: React.FC<{ progress: number; isWorking: boolean }> = ({
  progress,
  isWorking,
  children
}) => {
  const position = Math.max(100 - progress, 0);

  return (
    <div className={`circular-progress ${isWorking ? 'working' : 'break'}`}>
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
      {children}
    </div>
  );
};

export default CircularProgress;
