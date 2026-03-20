export type DateEditorState = {
  element: HTMLInputElement | null;
  originalValue: string;
  mode: 'view' | 'edit';
};

export const dateEditor: DateEditorState = { element: null, originalValue: '', mode: 'view' };

export function toggleDateEditor(element: HTMLInputElement) {
  if (dateEditor.mode === 'edit') {
    dateEditor.mode = 'view';
    dateEditor.element = null;
  } else {
    dateEditor.mode = 'edit';
    dateEditor.element = element;
    dateEditor.originalValue = element.value;
  }
}

export function cancelDateEditor() {
  if (dateEditor.mode === 'edit' && dateEditor.element) {
    dateEditor.element.value = dateEditor.originalValue;
    dateEditor.mode = 'view';
    dateEditor.element = null;
  }
}

export function handleDateFocusOut(e: FocusEvent) {
  if (e.target instanceof HTMLInputElement && e.target.type === 'date') {
    if (dateEditor.mode === 'edit') {
      dateEditor.mode = 'view';
      dateEditor.element = null;
    }
  }
}

function setDateValue(current: HTMLInputElement, date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  current.value = `${year}-${month}-${day}`;
  current.dispatchEvent(new Event('input', { bubbles: true }));
}

function parseDate(value: string): Date | null {
  if (!value) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    value = `${year}-${month}-${day}`;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
}

export function adjustDateByDay(direction: 'up' | 'down') {
  if (!dateEditor.element || dateEditor.mode !== 'edit') return;

  const date = parseDate(dateEditor.element.value);
  if (!date) return;

  if (direction === 'up') {
    date.setDate(date.getDate() + 1);
  } else {
    date.setDate(date.getDate() - 1);
  }

  setDateValue(dateEditor.element, date);
}

export function adjustDateByMonth(direction: 'left' | 'right') {
  if (!dateEditor.element || dateEditor.mode !== 'edit') return;

  const date = parseDate(dateEditor.element.value);
  if (!date) return;

  if (direction === 'right') {
    date.setMonth(date.getMonth() + 1);
  } else {
    date.setMonth(date.getMonth() - 1);
  }

  setDateValue(dateEditor.element, date);
}
