import React, { useContext } from 'react';
import { WorkingContext } from '../context/working/workingContext';
import { SettingsContext } from '../context/settings/settingsContext';
import CircularProgress from './CircularProgress';

const displayTime = (timeUnit: number): string => {
  if (timeUnit && timeUnit < 1) {
    return `${60 * timeUnit}`;
  }

  if (!timeUnit || (timeUnit && timeUnit < 10)) {
    return `0${timeUnit}`;
  }

  return `${timeUnit}`;
};

const convertToDecimal = (decimal: number): number => 60 * decimal;

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
  const { workDuration, shortBreak, longBreak } = useContext(SettingsContext);
  const { isWorking, isBreak, timeLeft, pomodoros } = useContext(
    WorkingContext
  );
  const { minutes, seconds } = timeLeft;
  const progress = calculateProgress(
    timeLeft,
    !isBreak ? workDuration : shortBreak
  );

  const initialTime = () => {
    if (isWorking || (!isWorking && !isBreak)) {
      return workDuration > 1
        ? `${displayTime(workDuration)} : ${displayTime(0)}`
        : `${displayTime(0)} : ${displayTime(convertToDecimal(workDuration))}`;
    } else if (isBreak && (pomodoros === 4 || pomodoros === 8)) {
      return longBreak > 1
        ? `${displayTime(longBreak)} : ${displayTime(0)}`
        : `${displayTime(0)} : ${displayTime(convertToDecimal(longBreak))}`;
    } else if (isBreak) {
      return shortBreak > 1
        ? `${displayTime(shortBreak)} : ${displayTime(0)}`
        : `${displayTime(0)} : ${displayTime(convertToDecimal(shortBreak))}`;
    }
  };

  return (
    <div className="timer">
      <CircularProgress
        progress={progress}
        strokeColor={isWorking ? 'tomato' : '#20c997'}
      >
        <h1 className="timer__title">
          {!minutes && !seconds
            ? initialTime()
            : `${displayTime(minutes)} : ${displayTime(seconds)}`}
        </h1>
      </CircularProgress>
    </div>
  );
};

export default Timer;
