import React, { useEffect, useContext, useCallback } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import { WorkingContext } from '../context/working/workingContext';
import Timer from './Timer';

const Countdown: React.FC = () => {
  const {
    workDuration,
    shortBreak,
    longBreak
    // autoStart
  } = useContext(SettingsContext);

  const {
    isWorking,
    isBreak,
    startWorking,
    stopWorking,
    stopRest,
    tick,
    pomodoros
  } = useContext(WorkingContext);

  const handleStopClick = () => {
    stopWorking();
    stopRest();
  };

  const duration = useCallback(() => {
    if (isWorking) {
      return workDuration;
    } else {
      return pomodoros === 4 || pomodoros === 8 ? longBreak : shortBreak;
    }
  }, [isWorking, longBreak, pomodoros, shortBreak, workDuration]);

  useEffect(() => {
    let timer: any;

    if (isWorking || isBreak) {
      timer = setInterval(() => tick(duration()), 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isBreak, isWorking, workDuration, shortBreak, tick, duration]);

  return (
    <React.Fragment>
      <Timer />

      {pomodoros ? (
        <h2 className="text-center">Pomodoros completed: {pomodoros}</h2>
      ) : null}

      <div className="col-12">
        <button
          type="button"
          className="btn btn-success"
          onClick={startWorking}
        >
          Start
        </button>
        <button
          type="button"
          className="btn btn-danger ml-3"
          onClick={handleStopClick}
        >
          Stop
        </button>
      </div>
    </React.Fragment>
  );
};

export default Countdown;
