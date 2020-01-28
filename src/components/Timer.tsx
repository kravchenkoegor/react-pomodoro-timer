import React, { useContext, useRef, useEffect } from 'react';
import { WorkingContext } from '../context/working/workingContext';
import CircularProgress from './CircularProgress';
import { ITime } from '../context/types';

const displayTime = (time: ITime): string => {
  let { minutes, seconds } = time;

  if (minutes && minutes < 1) {
    seconds = 60 * minutes;
    minutes = 0;
  }

  if (seconds > 59) {
    minutes = minutes + 1;
    seconds = 0;
  }

  return `${minutes < 10 ? '0' + minutes : minutes} : ${
    seconds < 10 ? '0' + seconds : seconds
  }`;
};

const Timer: React.FC = () => {
  const { timeLeft }: any = useContext(WorkingContext);
  // const progress = calculateProgress(timeLeft, workDuration);

  const h1 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    (h1.current as HTMLHeadingElement).innerText = displayTime(timeLeft);
  }, [timeLeft]);

  return (
    <div className="timer">
      <CircularProgress>
        <div className="timer__title" ref={h1}></div>
      </CircularProgress>
    </div>
  );
};

export default Timer;
