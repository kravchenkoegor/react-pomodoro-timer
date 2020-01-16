import React, { useReducer, useContext } from 'react';
import { SettingsContext } from '../settings/settingsContext';
import { WorkingContext } from './workingContext';
import { workingReducer } from './workingReducer';
import {
  START_WORKING,
  STOP_WORKING,
  START_REST,
  STOP_REST,
  TICK,
  IWorkingState
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

  return (
    <WorkingContext.Provider
      value={
        {
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
        } as IWorkingState
      }
    >
      {children}
    </WorkingContext.Provider>
  );
};
