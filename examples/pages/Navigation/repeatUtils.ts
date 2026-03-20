export const INITIAL_DELAY = 400;
export const REPEAT_RATE = 33;

type RepeatState = {
  lastTriggerTime: number;
  isRepeating: boolean;
};

const repeatStates: Record<string, RepeatState> = {};

function getOrCreateState(key: string): RepeatState {
  if (!repeatStates[key]) {
    repeatStates[key] = { lastTriggerTime: 0, isRepeating: false };
  }
  return repeatStates[key];
}

export function handleRepeat(key: string, moveFn: () => void) {
  const state = getOrCreateState(key);
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

export function resetRepeatState(key: string) {
  const state = repeatStates[key];
  if (state) {
    state.lastTriggerTime = 0;
    state.isRepeating = false;
  }
}
