export type RangeEditorState = {
  element: HTMLInputElement | null;
  originalValue: number;
  mode: 'view' | 'edit';
};

export const rangeEditor: RangeEditorState = { element: null, originalValue: 0, mode: 'view' };

export function updateRangeLabel() {
  const label = document.getElementById('range-label');
  if (!label) return;

  if (rangeEditor.element && rangeEditor.mode === 'edit') {
    label.textContent = `Range: ${rangeEditor.element.value}`;
  } else {
    label.textContent = 'Range';
  }
}

export function toggleRangeEditor(element: HTMLInputElement) {
  if (rangeEditor.mode === 'edit') {
    rangeEditor.mode = 'view';
    rangeEditor.element = null;
  } else {
    rangeEditor.mode = 'edit';
    rangeEditor.element = element;
    rangeEditor.originalValue = parseInt(element.value) || 0;
  }
  updateRangeLabel();
}

export function cancelRangeEditor() {
  if (rangeEditor.mode === 'edit' && rangeEditor.element) {
    rangeEditor.element.value = rangeEditor.originalValue.toString();
    rangeEditor.mode = 'view';
    rangeEditor.element = null;
    updateRangeLabel();
  }
}

export function handleRangeDirection(
  element: HTMLInputElement,
  direction: 'up' | 'down' | 'left' | 'right',
) {
  const min = parseInt(element.min) || 0;
  const max = parseInt(element.max) || 100;
  let value = parseInt(element.value) || 0;

  if (direction === 'right') {
    value = Math.min(max, value + 1);
  } else if (direction === 'left') {
    value = Math.max(min, value - 1);
  } else if (direction === 'up') {
    value = Math.min(max, value + 10);
  } else if (direction === 'down') {
    value = Math.max(min, value - 10);
  }

  element.value = value.toString();
  updateRangeLabel();
}

export function handleRangeFocusOut(e: FocusEvent) {
  const target = e.target;
  if (target instanceof HTMLInputElement && target.type === 'range') {
    if (rangeEditor.mode === 'edit') {
      rangeEditor.mode = 'view';
      rangeEditor.element = null;
      updateRangeLabel();
    }
  }
}

export function handleRangeClick() {
  if (rangeEditor.mode === 'edit') {
    rangeEditor.mode = 'view';
    rangeEditor.element = null;
    updateRangeLabel();
  }
}
