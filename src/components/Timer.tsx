import React, { useContext } from 'react';
import { WorkingContext } from '../context/working/workingContext';
import { SettingsContext } from '../context/settings/settingsContext';

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

const Timer: React.FC = () => {
  const { workDuration, shortBreak, longBreak } = useContext(SettingsContext);
  const { isWorking, isBreak, timeLeft, pomodoros } = useContext(
    WorkingContext
  );
  const { minutes, seconds } = timeLeft;

  let msg;

  if (!isWorking && !isBreak) {
    msg = 'Press "Start"';
  } else if (isWorking && !isBreak) {
    msg = 'Time to work!';
  } else if (!isWorking && isBreak) {
    msg = 'Time to rest!';
  }

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
    <h1 className={`${isWorking ? `bg-danger` : `bg-success`} text-center`}>
      {msg}
      <br />
      {!minutes && !seconds
        ? initialTime()
        : `${displayTime(minutes)} : ${displayTime(seconds)}`}
    </h1>
  );
};

export default Timer;
