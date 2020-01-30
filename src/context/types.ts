// workingContext
export const START_SESSION: string = 'START_SESSION';
export const STOP_SESSION: string = 'STOP_SESSION';
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

export interface ITime {
  minutes: number;
  seconds: number;
}

export interface IWorkingState {
  startTime: Date;
  endTime: Date;
  timeLeft: ITime;
  session: boolean;
  sessionOnPause?: boolean;
  sessionCompleted: boolean;
  completed: number;
  isWorking?: boolean;
  isBreak?: boolean;
}

export interface ISettingsState {
  settingsIsVisible: boolean;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
}
