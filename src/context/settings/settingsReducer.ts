import {
  SET_WORK_DURATION,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_AUTOSTART,
  IActionState,
  ISettingsState
} from '../types';

const handlers: { [k: string]: ISettingsState } = {
  [SET_WORK_DURATION]: (state: ISettingsState, payload: number) => {
    return {
      ...state,
      workDuration: payload
    };
  },
  [SET_SHORT_BREAK]: (state: ISettingsState, payload: number) => {
    return {
      ...state,
      shortBreak: payload
    };
  },
  [SET_LONG_BREAK]: (state: ISettingsState, payload: number) => {
    return {
      ...state,
      longBreak: payload
    };
  },
  [SET_AUTOSTART]: (state: ISettingsState, payload: boolean) => {
    return {
      ...state,
      autoStart: payload
    };
  },
  // @ts-ignore
  DEFAULT: (state: ISettingsState) => state
};

export const settingsReducer = (
  state: ISettingsState,
  action: IActionState
) => {
  const handler = (handlers as any)[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
