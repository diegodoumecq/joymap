import { colorEditor, handleColorDirection } from './colorEditor';
import { adjustDateByDay, adjustDateByMonth, dateEditor } from './dateEditor';
import { numberEditor } from './numberEditor';
import { handleRangeDirection, rangeEditor } from './rangeEditor';
import { handleSelectDirection } from './selectEditor';

export type Direction = 'right' | 'left' | 'down' | 'up';

export function getFocusableElements() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled'));
}

export function getNextFocus(
  direction: Direction,
  focusables: HTMLElement[],
  current: HTMLElement,
) {
  const currPos = current.getBoundingClientRect();
  const currCenterX = currPos.x + currPos.width / 2;
  const currCenterY = currPos.y + currPos.height / 2;

  const candidates: { el: HTMLElement; dx: number; dy: number; perp: number }[] = [];

  for (const el of focusables) {
    if (el === current) continue;
    const elPos = el.getBoundingClientRect();
    const elCenterX = elPos.x + elPos.width / 2;
    const elCenterY = elPos.y + elPos.height / 2;

    const dx = elCenterX - currCenterX;
    const dy = elCenterY - currCenterY;

    if (direction === 'right' && dx <= 0) continue;
    if (direction === 'left' && dx >= 0) continue;
    if (direction === 'down' && dy <= 0) continue;
    if (direction === 'up' && dy >= 0) continue;

    const overlaps =
      direction === 'right' || direction === 'left'
        ? elPos.top < currPos.bottom && elPos.bottom > currPos.top
        : elPos.left < currPos.right && elPos.right > currPos.left;

    if (overlaps) {
      const perp = direction === 'right' || direction === 'left' ? Math.abs(dy) : Math.abs(dx);
      candidates.push({ el, dx, dy, perp });
    }
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const aAxis = direction === 'right' || direction === 'left' ? Math.abs(a.dx) : Math.abs(a.dy);
    const bAxis = direction === 'right' || direction === 'left' ? Math.abs(b.dx) : Math.abs(b.dy);
    if (aAxis !== bAxis) return aAxis - bAxis;
    return a.perp - b.perp;
  });

  return candidates[0].el;
}

export function moveFocus(direction: Direction) {
  const current = document.activeElement as HTMLElement;

  const TEXT_INPUT_TYPES = ['text', 'password', 'search', 'url', 'tel', ''];

  const isTextLikeInput = (el: Element): el is HTMLInputElement | HTMLTextAreaElement =>
    el instanceof HTMLTextAreaElement ||
    (el instanceof HTMLInputElement && TEXT_INPUT_TYPES.includes(el.type));

  if (isTextLikeInput(current)) {
    const moved = moveCursor(current as HTMLInputElement | HTMLTextAreaElement, direction);
    if (moved === true) return;
    if (moved === null) return;
    const focusables = getFocusableElements();
    const next = getNextFocus(direction, focusables, current);
    next?.focus();
    return;
  }

  if (
    current instanceof HTMLInputElement &&
    current.type === 'date' &&
    dateEditor.mode === 'edit'
  ) {
    if (direction === 'up' || direction === 'down') {
      adjustDateByDay(direction);
    } else {
      adjustDateByMonth(direction);
    }
    return;
  }

  if (current instanceof HTMLSelectElement) {
    if (handleSelectDirection(current, direction)) {
      return;
    }
  }

  if (
    current instanceof HTMLInputElement &&
    current.type === 'color' &&
    colorEditor.mode === 'edit'
  ) {
    handleColorDirection(current, direction);
    return;
  }

  if (
    current instanceof HTMLInputElement &&
    current.type === 'range' &&
    rangeEditor.mode === 'edit'
  ) {
    handleRangeDirection(current, direction);
    return;
  }

  if (
    current instanceof HTMLInputElement &&
    current.type === 'number' &&
    numberEditor.mode === 'edit'
  ) {
    return;
  }

  const focusables = getFocusableElements();
  const next = getNextFocus(direction, focusables, current);
  next?.focus();
}

function moveCursor(
  element: HTMLInputElement | HTMLTextAreaElement,
  direction: Direction,
): boolean | null {
  if (!element.isConnected) return null;

  const hasSelectionSupport =
    element instanceof HTMLTextAreaElement ||
    (element instanceof HTMLInputElement &&
      ['text', 'email', 'password', 'search', 'url', 'tel'].includes(element.type));

  if (!hasSelectionSupport) {
    return null;
  }
  const start = element.selectionStart ?? 0;
  const length = element.value.length;

  if (direction === 'left') {
    if (start === 0) return false;
    element.setSelectionRange(start - 1, start - 1);
    return true;
  } else if (direction === 'right') {
    if (start >= length) return false;
    element.setSelectionRange(start + 1, start + 1);
    return true;
  } else if (direction === 'up') {
    const beforeCursor = element.value.substring(0, start);
    if (!beforeCursor.includes('\n')) return false;
    const lastNewline = beforeCursor.lastIndexOf('\n');
    element.setSelectionRange(lastNewline + 1, lastNewline + 1);
    return true;
  } else if (direction === 'down') {
    const afterCursor = element.value.substring(start);
    if (!afterCursor.includes('\n')) return false;
    const nextNewline = afterCursor.indexOf('\n');
    element.setSelectionRange(start + nextNewline + 1, start + nextNewline + 1);
    return true;
  }
  return false;
}

export function tabNext() {
  const focusables = getFocusableElements();
  const current = document.activeElement as HTMLElement;
  const currentIndex = focusables.indexOf(current);
  const nextIndex = (currentIndex + 1) % focusables.length;
  focusables[nextIndex]?.focus();
}

export function tabPrev() {
  const focusables = getFocusableElements();
  const current = document.activeElement as HTMLElement;
  const currentIndex = focusables.indexOf(current);
  const prevIndex = (currentIndex - 1 + focusables.length) % focusables.length;
  focusables[prevIndex]?.focus();
}

function isScrollable(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  const overflow = style.overflow;
  const overflowY = style.overflowY;
  const overflowX = style.overflowX;
  return (
    overflow === 'auto' ||
    overflow === 'scroll' ||
    overflowY === 'auto' ||
    overflowY === 'scroll' ||
    overflowX === 'auto' ||
    overflowX === 'scroll'
  );
}

function getScrollableAncestor(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element.parentElement;
  while (current) {
    if (isScrollable(current)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function getFocusablesInContainer(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && el.style.display !== 'none');
}

export function focusBeforeContainer() {
  const current = document.activeElement as HTMLElement;
  const scrollableAncestor = getScrollableAncestor(current);

  if (!scrollableAncestor) {
    const focusables = getFocusableElements();
    focusables[0]?.focus();
    return;
  }

  const allFocusables = getFocusableElements();
  const containerFocusables = getFocusablesInContainer(scrollableAncestor);
  const containerIndex = allFocusables.indexOf(containerFocusables[0]);

  if (containerIndex > 0) {
    allFocusables[containerIndex - 1]?.focus();
  } else {
    tabPrev();
  }
}

export function focusAfterContainer() {
  const current = document.activeElement as HTMLElement;
  const scrollableAncestor = getScrollableAncestor(current);

  if (!scrollableAncestor) {
    const focusables = getFocusableElements();
    focusables[focusables.length - 1]?.focus();
    return;
  }

  const allFocusables = getFocusableElements();
  const containerFocusables = getFocusablesInContainer(scrollableAncestor);
  const lastContainerIndex = allFocusables.indexOf(
    containerFocusables[containerFocusables.length - 1],
  );

  if (lastContainerIndex < allFocusables.length - 1) {
    allFocusables[lastContainerIndex + 1]?.focus();
  } else {
    tabNext();
  }
}
