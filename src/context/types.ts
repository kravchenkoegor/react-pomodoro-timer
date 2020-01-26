// workingContext
export const START_WORKING: string = 'START_WORKING';
export const STOP_WORKING: string = 'STOP_WORKING';
export const START_REST: string = 'START_REST';
export const STOP_REST: string = 'STOP_REST';
export const TICK: string = 'TICK';
export const ADD_POMODORO: string = 'ADD_POMODORO';
export const UPDATE_TIME_LEFT: string = 'UPDATE_TIME_LEFT';

// settingsContext
export const SHOW_SETTINGS: string = 'SHOW_SETTINGS';
export const SET_WORK_DURATION: string = 'SET_WORK_DURATION';
export const SET_SHORT_BREAK: string = 'SET_SHORT_BREAK';
export const SET_LONG_BREAK: string = 'SET_LONG_BREAK';
export const SET_AUTOSTART: string = 'SET_AUTOSTART';

export interface IContextState<T> {
  [k: string]: T;
}

export interface IActionState {
  type: string;
  payload?: any;
}

export interface IWorkingState {
  start: Date;
  isWorking: boolean;
  isBreak: boolean;
  timeLeft: {
    minutes: number | null;
    seconds: number | null;
  };
  pomodoros: number;
}

export interface ISettingsState {
  settingsIsVisible: boolean;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
}
