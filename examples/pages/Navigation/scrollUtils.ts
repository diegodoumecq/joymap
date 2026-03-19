export function getScrollableAncestor(
  element: HTMLElement,
  direction: 'x' | 'y',
): HTMLElement | null {
  let current: HTMLElement | null = element.parentElement;

  while (current) {
    const style = window.getComputedStyle(current);
    const overflow = direction === 'x' ? style.overflowX : style.overflowY;

    if (overflow === 'auto' || overflow === 'scroll') {
      const scrollPos = direction === 'x' ? current.scrollLeft : current.scrollTop;
      const maxScroll =
        direction === 'x'
          ? current.scrollWidth - current.clientWidth
          : current.scrollHeight - current.clientHeight;
      const canScroll = scrollPos > 0 || scrollPos < maxScroll;

      if (canScroll) {
        return current;
      }
    }

    current = current.parentElement;
  }

  return null;
}

export function scrollElement(element: HTMLElement, direction: 'x' | 'y', amount: number): boolean {
  const scrollable = getScrollableAncestor(element, direction);
  if (scrollable) {
    scrollable.scrollBy({
      [direction === 'x' ? 'left' : 'top']: amount,
      behavior: 'instant',
    });
    return true;
  }
  return false;
}
