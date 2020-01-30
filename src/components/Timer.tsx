import React, { useContext, useRef, useEffect, useCallback } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import { WorkingContext } from '../context/working/workingContext';
import { ITime } from '../context/types';
import CircularProgress from './CircularProgress';

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

const calculateProgress = (
  timeLeft: {
    minutes: number;
    seconds: number;
  },
  totalTime: number
): number => {
  const { minutes, seconds } = timeLeft;
  const percentage = (100 * (minutes * 60 + seconds)) / (totalTime * 60);
  return Number(percentage.toFixed(2));
};

const Timer: React.FC = () => {
  const { isBreak, isWorking, timeLeft, updateTimeLeft }: any = useContext(
    WorkingContext
  );
  const { workDuration, shortBreak } = useContext(SettingsContext);

  const updateTimeLeftCallback = useCallback(
    () => {
      if (!isWorking && !isBreak) {
        return;
      }

      updateTimeLeft(isWorking ? workDuration : shortBreak);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isBreak, isWorking, shortBreak, workDuration]
  );

  const progress = useCallback(
    () => calculateProgress(timeLeft, isWorking ? workDuration : shortBreak),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeLeft, shortBreak, workDuration]
  );

  const h1 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    (h1.current as HTMLHeadingElement).innerText = displayTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => updateTimeLeftCallback(), [updateTimeLeftCallback]);

  return (
    <div className="timer">
      <CircularProgress
        progress={progress()}
        isWorking={(!isWorking && !isBreak) || isWorking}
      >
        <div className="timer__title" ref={h1}></div>
      </CircularProgress>
    </div>
  );
};

export default Timer;
