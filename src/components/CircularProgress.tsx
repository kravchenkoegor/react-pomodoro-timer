import React, { useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import { WorkingContext } from '../context/working/workingContext';
import { ITime } from '../context/types';

// https://codedaily.io/tutorials/79/Create-an-Animated-Circular-Progress-Indicator-to-Track-Article-Read-Percentage-in-React

const DIAMETER = 290;
const STROKE_WIDTH = 50;
const RADIUS = DIAMETER / 2 - STROKE_WIDTH / 2;
const CIRCUMFERENCE = Math.PI * RADIUS * 2;

const calculateProgress = (timeLeft: ITime, totalTime: number): number => {
  const { minutes, seconds } = timeLeft;
  const percentage = (100 * (minutes * 60 + seconds)) / (totalTime * 60);
  return Number(percentage.toFixed(2));
};

const CircularProgress: React.FC = ({ children }) => {
  const { workDuration } = useContext(SettingsContext);
  const { session, timeLeft } = useContext(WorkingContext);

  const progress = useRef(100);

  useEffect(() => {
    let interval: any;

    if (session) {
      setInterval(() => {
        progress.current = calculateProgress(timeLeft, workDuration);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [session, timeLeft, workDuration]);

  const position = Math.max(100 - progress.current, 0);

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
      {children}
    </div>
  );
};

export default CircularProgress;
