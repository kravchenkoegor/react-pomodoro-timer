import React, { useContext, useCallback, useEffect } from 'react';
import { SettingsContext } from '../context/settings/settingsContext';
import { WorkingContext } from '../context/working/workingContext';
import Button from '../components/Button';
// import { ReactComponent as ReloadIcon } from './icons/reload.svg';

const Controls: React.FC = () => {
  const {
    workDuration,
    shortBreak,
    longBreak,
    // autoStart,
    settingsIsVisible,
    showSettings
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

  const onPress = () => {
    if (!isWorking) {
      if (shortBreak || longBreak) {
        stopRest();
      }

      startWorking();
    } else {
      stopWorking();
    }
  };

  return (
    <div className="controls">
      <Button
        onPress={onPress}
        btnText={!isWorking ? 'Start' : 'Pause'}
        btnClassName={`controls__btn ${
          !isWorking ? 'controls__btn_start' : 'controls__btn_pause'
        } `}
      />

      <Button
        btnClassName="controls__btn controls__btn_accent"
        onPress={showSettings.bind(null, !settingsIsVisible)}
        btnText="settings"
      />

      {/* <ReloadIcon height="32" width="32" onClick={() => console.log(1)} /> */}
    </div>
  );
};

export default Controls;
