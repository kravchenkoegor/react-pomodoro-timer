import {
  START_SESSION,
  STOP_SESSION,
  TICK,
  UPDATE_TIME_LEFT,
  RESET,
  IActionState,
  IWorkingState,
  ITime
} from '../types';

const addTime = (date: Date, duration: ITime): Date => {
  const { minutes, seconds } = duration;
  return new Date(date.getTime() + minutes * 60000 + seconds * 1000);
};

const calculateTimeLeft = (endTime: Date): ITime => {
  const difference: number = Number(endTime) - Number(new Date());

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
  [START_SESSION]: (state: IWorkingState): IWorkingState => {
    const { isWorking, isBreak } = state;

    return {
      ...state,
      isWorking: !isWorking && !isBreak ? true : isWorking,
      session: true,
      sessionPaused: false,
      startTime: new Date(),
      endTime: addTime(new Date(), state.timeLeft)
    };
  },
  [STOP_SESSION]: (state: IWorkingState): IWorkingState => {
    return {
      ...state,
      session: false,
      sessionPaused: true
    };
  },
  [TICK]: (state: IWorkingState): IWorkingState => {
    const { completed, endTime, isWorking, isBreak } = state;
    const { minutes, seconds } = calculateTimeLeft(endTime as Date);

    const newState = Object.assign(
      {},
      {
        ...state,
        timeLeft: {
          minutes,
          seconds
        }
      }
    );

    if (!minutes && !seconds) {
      delete newState.startTime;
      delete newState.endTime;
      newState.isWorking = !isWorking;
      newState.isBreak = !isBreak;
      newState.startTime = new Date();
      newState.session = false;

      if (isWorking) {
        newState.completed = completed + 1;
      }
    }

    return newState;
  },
  [UPDATE_TIME_LEFT]: (
    state: IWorkingState,
    payload: number
  ): IWorkingState => {
    return {
      ...state,
      timeLeft: {
        minutes: payload,
        seconds: 0
      }
    };
  },
  [RESET]: (state: IWorkingState) => {
    const { startTime, endTime, ...rest } = state;

    return {
      ...rest,
      isBreak: false,
      isWorking: false,
      session: false,
      sessionPaused: false
    };
  },
  // @ts-ignore
  DEFAULT: (state: IWorkingState): IWorkingState => state
};

export const workingReducer = (state: IWorkingState, action: IActionState) => {
  const handler = (handlers as any)[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
