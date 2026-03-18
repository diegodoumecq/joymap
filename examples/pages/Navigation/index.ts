import { createEventModule, createJoymap, StickResult } from 'joymap';

import { generatePixelArtContainer, PIXEL_ART_SIZE } from './pixelArt';

type Direction = 'right' | 'left' | 'down' | 'up';

const INITIAL_DELAY = 400;
const REPEAT_RATE = 33;

type RepeatState = {
  lastTriggerTime: number;
  isRepeating: boolean;
};

const repeatStates: Record<Direction | 'tabNext' | 'tabPrev', RepeatState> = {
  right: { lastTriggerTime: 0, isRepeating: false },
  left: { lastTriggerTime: 0, isRepeating: false },
  up: { lastTriggerTime: 0, isRepeating: false },
  down: { lastTriggerTime: 0, isRepeating: false },
  tabNext: { lastTriggerTime: 0, isRepeating: false },
  tabPrev: { lastTriggerTime: 0, isRepeating: false },
};

function getNextFocus(direction: Direction, focusables: HTMLElement[], current: HTMLElement) {
  let best: HTMLElement | null = null;
  let bestScore = Infinity;

  for (const el of focusables) {
    if (el === current) continue;
    const currPos = current.getBoundingClientRect();
    const elPos = el.getBoundingClientRect();

    const dx = elPos.x - currPos.x;
    const dy = elPos.y - currPos.y;

    // reject elements not in that direction
    if (direction === 'right' && dx <= 0) continue;
    if (direction === 'left' && dx >= 0) continue;
    if (direction === 'down' && dy <= 0) continue;
    if (direction === 'up' && dy >= 0) continue;

    // Euclidean distance
    const distance = Math.sqrt(dx * dx + dy * dy);

    // perpendicular distance to the direction
    let perpendicular = 0;
    if (direction === 'right' || direction === 'left') perpendicular = Math.abs(dy);
    if (direction === 'up' || direction === 'down') perpendicular = Math.abs(dx);

    // weight perpendicular distance
    const score = distance + perpendicular * 2; // 2 = penalty factor

    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }

  return best;
}

function getFocusableElements() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled'));
}

function getScrollableAncestor(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element.parentElement;

  while (current) {
    const style = window.getComputedStyle(current);
    const overflowX = style.getPropertyValue('overflow-x');
    const overflowY = style.getPropertyValue('overflow-y');

    if (
      overflowX === 'auto' ||
      overflowX === 'scroll' ||
      overflowY === 'auto' ||
      overflowY === 'scroll'
    ) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

function moveFocus(direction: Direction) {
  const focusables = getFocusableElements();
  const current = document.activeElement as HTMLElement;
  const next = getNextFocus(direction, focusables, current);
  next?.focus();
}

function tabNext() {
  const focusables = getFocusableElements();
  const current = document.activeElement as HTMLElement;
  const currentIndex = focusables.indexOf(current);
  const nextIndex = (currentIndex + 1) % focusables.length;
  focusables[nextIndex]?.focus();
}

function tabPrev() {
  const focusables = getFocusableElements();
  const current = document.activeElement as HTMLElement;
  const currentIndex = focusables.indexOf(current);
  const prevIndex = (currentIndex - 1 + focusables.length) % focusables.length;
  focusables[prevIndex]?.focus();
}

function handleRepeat(key: keyof typeof repeatStates, moveFn: () => void) {
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

const joymap = createJoymap();
const module = createEventModule();
joymap.addModule(module);

module.addEvent('dpadRight.justPressed', () => {
  moveFocus('right');
});

module.addEvent('dpadRight.pressed', () => {
  handleRepeat('right', () => moveFocus('right'));
});

module.addEvent('dpadRight.released', () => {
  repeatStates.right.lastTriggerTime = 0;
  repeatStates.right.isRepeating = false;
});

module.addEvent('dpadLeft.justPressed', () => {
  moveFocus('left');
});

module.addEvent('dpadLeft.pressed', () => {
  handleRepeat('left', () => moveFocus('left'));
});

module.addEvent('dpadLeft.released', () => {
  repeatStates.left.lastTriggerTime = 0;
  repeatStates.left.isRepeating = false;
});

module.addEvent('dpadUp.justPressed', () => {
  moveFocus('up');
});

module.addEvent('dpadUp.pressed', () => {
  handleRepeat('up', () => moveFocus('up'));
});

module.addEvent('dpadUp.released', () => {
  repeatStates.up.lastTriggerTime = 0;
  repeatStates.up.isRepeating = false;
});

module.addEvent('dpadDown.justPressed', () => {
  moveFocus('down');
});

module.addEvent('dpadDown.pressed', () => {
  handleRepeat('down', () => moveFocus('down'));
});

module.addEvent('dpadDown.released', () => {
  repeatStates.down.lastTriggerTime = 0;
  repeatStates.down.isRepeating = false;
});

module.addEvent('R1.justPressed', () => {
  tabNext();
});

module.addEvent('R1.pressed', () => {
  handleRepeat('tabNext', tabNext);
});

module.addEvent('R1.released', () => {
  repeatStates.tabNext.lastTriggerTime = 0;
  repeatStates.tabNext.isRepeating = false;
});

module.addEvent('L1.justPressed', () => {
  tabPrev();
});

module.addEvent('L1.pressed', () => {
  handleRepeat('tabPrev', tabPrev);
});

module.addEvent('L1.released', () => {
  repeatStates.tabPrev.lastTriggerTime = 0;
  repeatStates.tabPrev.isRepeating = false;
});

module.addEvent('A.justPressed', () => {
  const current = document.activeElement as HTMLElement;
  current?.click();
});

module.addEvent('R.pressed', (result) => {
  const stickResult = result[0] as StickResult;
  const [x, y] = stickResult.value;
  const current = document.activeElement as HTMLElement;
  const scrollableAncestor = getScrollableAncestor(current);

  // Vertical scrolling
  if (y < -0.2) {
    const scrollAmount = y * 10;
    if (scrollableAncestor) {
      scrollableAncestor.scrollBy({ top: scrollAmount, behavior: 'instant' });
    } else {
      window.scrollBy({ top: scrollAmount, behavior: 'instant' });
    }
  }
  if (y > 0.2) {
    const scrollAmount = y * 10;
    if (scrollableAncestor) {
      scrollableAncestor.scrollBy({ top: scrollAmount, behavior: 'instant' });
    } else {
      window.scrollBy({ top: scrollAmount, behavior: 'instant' });
    }
  }

  // Horizontal scrolling
  if (x < -0.2) {
    const scrollAmount = x * 10;
    if (scrollableAncestor) {
      scrollableAncestor.scrollBy({ left: scrollAmount, behavior: 'instant' });
    } else {
      window.scrollBy({ left: scrollAmount, behavior: 'instant' });
    }
  }
  if (x > 0.2) {
    const scrollAmount = x * 10;
    if (scrollableAncestor) {
      scrollableAncestor.scrollBy({ left: scrollAmount, behavior: 'instant' });
    } else {
      window.scrollBy({ left: scrollAmount, behavior: 'instant' });
    }
  }
});

generatePixelArtContainer().then((art) => {
  const pixelArtContainer = document.getElementById('pixel-art');
  if (pixelArtContainer) {
    pixelArtContainer.innerHTML = art;
  }
});

const pixelArtHeading = document.getElementById('pixel-art-heading');
if (pixelArtHeading) {
  pixelArtHeading.textContent = `Checkbox Art (${PIXEL_ART_SIZE}x${PIXEL_ART_SIZE})`;
}

joymap.start();
