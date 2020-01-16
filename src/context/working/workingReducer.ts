import {
  START_WORKING,
  STOP_WORKING,
  START_REST,
  STOP_REST,
  TICK,
  IActionState,
  IWorkingState
} from '../types';

const addMinutes = (date: Date, minutes: number): number => {
  return Number(new Date(date.getTime() + minutes * 60000));
};

const calculateTimeLeft = (duration: number, startTime: Date): any => {
  const difference: number =
    addMinutes(startTime, duration) - Number(new Date());

  if (difference > 0) {
    return {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60) + 1
    };
  } else {
    return {
      minutes: 0,
      seconds: 0
    };
  }
};

const handlers: { [k: string]: IWorkingState } = {
  [START_WORKING]: (state: IWorkingState): IWorkingState => ({
    ...state,
    start: new Date(),
    isWorking: true
  }),
  [STOP_WORKING]: (state: IWorkingState): IWorkingState => ({
    ...state,
    isWorking: false
  }),
  [START_REST]: (state: IWorkingState): IWorkingState => ({
    ...state,
    start: new Date(),
    isBreak: true
  }),
  [STOP_REST]: (state: IWorkingState): IWorkingState => ({
    ...state,
    isBreak: false
  }),
  [TICK]: (state: IWorkingState, duration: number): IWorkingState => {
    const { start, isWorking, isBreak, pomodoros } = state;
    const { minutes, seconds } = calculateTimeLeft(duration, start);

    const newState = Object.assign(
      {},
      {
        ...state,
        timeLeft: calculateTimeLeft(duration, start)
      }
    );

    if (!minutes && !seconds) {
      newState.isWorking = !isWorking;
      newState.isBreak = !isBreak;
      newState.start = new Date();

      if (isWorking) {
        newState.pomodoros = pomodoros + 1;
      }
    }

    return newState;
  },
  // @ts-ignore
  DEFAULT: (state: IWorkingState): IWorkingState => state
};

export const workingReducer = (state: IWorkingState, action: IActionState) => {
  const handler = (handlers as any)[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
