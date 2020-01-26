import React, { useReducer } from 'react';
import { SettingsContext } from './settingsContext';
import { settingsReducer } from './settingsReducer';
import {
  SHOW_SETTINGS,
  SET_WORK_DURATION,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_AUTOSTART
} from '../types';

export const SettingsState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    settingsIsVisible: false,
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStart: true
  });

  const showSettings = (show: boolean) =>
    dispatch({ type: SHOW_SETTINGS, payload: show });
  const setWorkDuration = (workDuration: number) =>
    dispatch({ type: SET_WORK_DURATION, payload: workDuration });
  const setShortBreak = (shortBreak: number) =>
    dispatch({ type: SET_SHORT_BREAK, payload: shortBreak });
  const setLongBreak = (longBreak: number) =>
    dispatch({ type: SET_LONG_BREAK, payload: longBreak });
  const setAutoStart = (autoStart: boolean) =>
    dispatch({ type: SET_AUTOSTART, payload: autoStart });

  const value = {
    workDuration: state.workDuration,
    shortBreak: state.shortBreak,
    longBreak: state.longBreak,
    autoStart: state.autoStart,
    setWorkDuration,
    setShortBreak,
    setLongBreak,
    setAutoStart,
    settingsIsVisible: state.settingsIsVisible,
    showSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
