export type RepeatState = {
  lastTriggerTime: number;
  isRepeating: boolean;
};

export type RepeatKey =
  | 'right'
  | 'left'
  | 'up'
  | 'down'
  | 'tabNext'
  | 'tabPrev'
  | 'delete'
  | 'numberUp'
  | 'numberDown';

export const INITIAL_DELAY = 400;
export const REPEAT_RATE = 33;

export const repeatStates: Record<RepeatKey, RepeatState> = {
  right: { lastTriggerTime: 0, isRepeating: false },
  left: { lastTriggerTime: 0, isRepeating: false },
  up: { lastTriggerTime: 0, isRepeating: false },
  down: { lastTriggerTime: 0, isRepeating: false },
  tabNext: { lastTriggerTime: 0, isRepeating: false },
  tabPrev: { lastTriggerTime: 0, isRepeating: false },
  delete: { lastTriggerTime: 0, isRepeating: false },
  numberUp: { lastTriggerTime: 0, isRepeating: false },
  numberDown: { lastTriggerTime: 0, isRepeating: false },
};

export function handleRepeat(key: RepeatKey, moveFn: () => void) {
  const state = repeatStates[key];
  const now = performance.now();

  if (state.lastTriggerTime === 0) {
    state.lastTriggerTime = now;
    return;
  }

  const elapsed = now - state.lastTriggerTime;
  const threshold = state.isRepeating ? REPEAT_RATE : INITIAL_DELAY;

  if (elapsed >= threshold) {
    moveFn();
    state.lastTriggerTime = now;
    state.isRepeating = true;
  }
}

export function resetRepeatState(key: RepeatKey) {
  repeatStates[key].lastTriggerTime = 0;
  repeatStates[key].isRepeating = false;
}
