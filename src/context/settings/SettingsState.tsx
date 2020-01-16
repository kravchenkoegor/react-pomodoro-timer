import React, { useReducer } from 'react';
import { SettingsContext } from './settingsContext';
import { settingsReducer } from './settingsReducer';
import {
  SET_WORK_DURATION,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_AUTOSTART
} from '../types';

export const SettingsState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStart: true
  });

  const setWorkDuration = (workDuration: number) => {
    dispatch({ type: SET_WORK_DURATION, payload: workDuration });
  };

  const setShortBreak = (shortBreak: number) =>
    dispatch({ type: SET_SHORT_BREAK, payload: shortBreak });
  const setLongBreak = (longBreak: number) =>
    dispatch({ type: SET_LONG_BREAK, payload: longBreak });
  const setAutoStart = (autoStart: boolean) =>
    dispatch({ type: SET_AUTOSTART, payload: autoStart });

  return (
    <SettingsContext.Provider
      value={{
        workDuration: state.workDuration,
        shortBreak: state.shortBreak,
        longBreak: state.longBreak,
        autoStart: state.autoStart,
        setWorkDuration,
        setShortBreak,
        setLongBreak,
        setAutoStart
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
