type Direction = 'right' | 'left' | 'down' | 'up';

function getNextFocus(direction: Direction, focusables: HTMLElement[], current: HTMLElement) {
  let best = null;
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

