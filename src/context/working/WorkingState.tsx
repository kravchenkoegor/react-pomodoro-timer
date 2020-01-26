import React, { useReducer, useContext, useEffect } from 'react';
import { SettingsContext } from '../settings/settingsContext';
import { WorkingContext } from './workingContext';
import { workingReducer } from './workingReducer';
import {
  START_WORKING,
  STOP_WORKING,
  START_REST,
  STOP_REST,
  TICK,
  IWorkingState,
  UPDATE_TIME_LEFT
} from '../types';

export const WorkingState: React.FC = ({ children }) => {
  const { workDuration } = useContext(SettingsContext);

  const [state, dispatch] = useReducer(workingReducer, {
    isWorking: false,
    isBreak: false,
    timeLeft: {
      minutes: workDuration,
      seconds: 0
    },
    pomodoros: 0
  } as IWorkingState);

  const startWorking = () => dispatch({ type: START_WORKING });
  const stopWorking = () => dispatch({ type: STOP_WORKING });
  const startRest = () => dispatch({ type: START_REST });
  const stopRest = () => dispatch({ type: STOP_REST });
  const tick = (duration: number) =>
    dispatch({ type: TICK, payload: duration });

  useEffect(() => {
    dispatch({ type: UPDATE_TIME_LEFT, payload: workDuration });
  }, [workDuration]);

  const value = {
    start: state.start,
    isWorking: state.isWorking,
    isBreak: state.isBreak,
    startWorking,
    stopWorking,
    startRest,
    stopRest,
    tick,
    timeLeft: state.timeLeft,
    pomodoros: state.pomodoros
  };

  return (
    <WorkingContext.Provider value={value as IWorkingState}>
      {children}
    </WorkingContext.Provider>
  );
};