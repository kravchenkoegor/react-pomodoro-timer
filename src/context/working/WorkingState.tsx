import React, { useReducer, useContext, useEffect } from 'react';
import { SettingsContext } from '../settings/settingsContext';
import { WorkingContext } from './workingContext';
import { workingReducer } from './workingReducer';
import {
  START_SESSION,
  STOP_SESSION,
  TICK,
  UPDATE_TIME_LEFT,
  IWorkingState,
  ITime
} from '../types';

export const WorkingState: React.FC = ({ children }) => {
  const { workDuration } = useContext(SettingsContext);

  const [state, dispatch]: [
    IWorkingState,
    React.Dispatch<{ type: string; payload?: number | ITime }>
  ] = useReducer(workingReducer, {
    session: false,
    timeLeft: {
      minutes: workDuration,
      seconds: 0
    },
    completed: 0
  });

  const startSession = (): void => dispatch({ type: START_SESSION });
  const stopSession = (): void => dispatch({ type: STOP_SESSION });
  const tick = (): void => dispatch({ type: TICK });

  useEffect(() => {
    dispatch({ type: UPDATE_TIME_LEFT, payload: workDuration });
  }, [workDuration]);

  const value = {
    startTime: state.startTime,
    endTime: state.endTime,
    session: state.session,
    sessionOnPause: state.sessionOnPause,
    sessionCompleted: state.sessionCompleted,
    startSession,
    stopSession,
    tick,
    timeLeft: state.timeLeft,
    completed: state.completed
  };

  return (
    <WorkingContext.Provider value={value as IWorkingState}>
      {children}
    </WorkingContext.Provider>
  );
};
