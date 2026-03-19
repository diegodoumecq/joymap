export function expandSelect(select: HTMLSelectElement) {
  select.size = select.options.length;
}

export function collapseSelect(select: HTMLSelectElement) {
  select.size = 1;
}

export function toggleSelect(select: HTMLSelectElement) {
  if (select.size > 1) {
    collapseSelect(select);
  } else {
    expandSelect(select);
  }
}

export function handleSelectDirection(
  select: HTMLSelectElement,
  direction: 'up' | 'down' | 'left' | 'right',
): boolean {
  if (!isSelectExpanded(select)) {
    return false;
  }

  if (direction === 'down') {
    const nextIndex = Math.min(select.selectedIndex + 1, select.options.length - 1);
    select.selectedIndex = nextIndex;
    return true;
  } else if (direction === 'up') {
    const prevIndex = Math.max(select.selectedIndex - 1, 0);
    select.selectedIndex = prevIndex;
    return true;
  }
  return false;
}

export function isSelectExpanded(select: HTMLSelectElement): boolean {
  return select.size > 1;
}

export function handleSelectFocusOut(e: FocusEvent) {
  const target = e.target;
  if (target instanceof HTMLSelectElement && isSelectExpanded(target)) {
    collapseSelect(target);
  }
}

export function handleSelectClick() {
  const select = document.activeElement;
  if (select instanceof HTMLSelectElement && isSelectExpanded(select)) {
    collapseSelect(select);
  }
}
