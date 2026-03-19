export type NumberEditorState = {
  element: HTMLInputElement | null;
  originalValue: string;
  mode: 'view' | 'edit';
};

export const numberEditor: NumberEditorState = { element: null, originalValue: '', mode: 'view' };

export function toggleNumberEditor(element: HTMLInputElement) {
  if (numberEditor.mode === 'edit') {
    numberEditor.mode = 'view';
    numberEditor.element = null;
  } else {
    numberEditor.mode = 'edit';
    numberEditor.element = element;
    numberEditor.originalValue = element.value;
  }
}

export function cancelNumberEditor() {
  if (numberEditor.mode === 'edit' && numberEditor.element) {
    numberEditor.element.value = numberEditor.originalValue;
    numberEditor.mode = 'view';
    numberEditor.element = null;
  }
}

export function incrementNumber() {
  if (!numberEditor.element) return;
  const element = numberEditor.element;
  const step = parseFloat(element.step) || 1;
  const max = parseFloat(element.max) || Infinity;
  let value = parseFloat(element.value) || 0;
  value = Math.min(max, value + step);
  element.value = value.toString();
  element.dispatchEvent(new Event('input', { bubbles: true }));
}

export function decrementNumber() {
  if (!numberEditor.element) return;
  const element = numberEditor.element;
  const step = parseFloat(element.step) || 1;
  const min = parseFloat(element.min) || -Infinity;
  let value = parseFloat(element.value) || 0;
  value = Math.max(min, value - step);
  element.value = value.toString();
  element.dispatchEvent(new Event('input', { bubbles: true }));
}

export function handleNumberFocusOut(e: FocusEvent) {
  if (e.target instanceof HTMLInputElement && e.target.type === 'number') {
    if (numberEditor.mode === 'edit') {
      numberEditor.mode = 'view';
      numberEditor.element = null;
    }
  }
}
