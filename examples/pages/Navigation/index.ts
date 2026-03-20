import { createEventModule, createJoymap, StickResult } from 'joymap';

import {
  attachCanvasUpdater,
  renderCheckboxesToCanvas,
  setCanvasDimensions,
} from './canvasRenderer';
import { cancelColorEditor, handleColorFocusOut, toggleColorEditor } from './colorEditor';
import { cancelDateEditor, handleDateFocusOut, toggleDateEditor } from './dateEditor';
import {
  Direction,
  focusAfterContainer,
  focusBeforeContainer,
  moveFocus,
  tabNext,
  tabPrev,
} from './focusUtils';
import { loadImageAsMatrix } from './imgToCheckboxes';
import {
  cancelNumberEditor,
  decrementNumber,
  handleNumberFocusOut,
  incrementNumber,
  numberEditor,
  toggleNumberEditor,
} from './numberEditor';
import {
  generateCheckboxesFromMatrix,
  generatePixelArtContainer,
  PIXEL_ART_SIZE,
} from './pixelArt';
import { cancelRangeEditor, handleRangeFocusOut, toggleRangeEditor } from './rangeEditor';
import { handleRepeat, resetRepeatState } from './repeatUtils';
import { scrollElement } from './scrollUtils';
import { handleSelectClick, handleSelectFocusOut, toggleSelect } from './selectEditor';
import { initVoiceRecognition, startListening, stopListening } from './voiceUtils';

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const joymap = createJoymap();
const module = createEventModule();
joymap.addModule(module);

function addDpadEvents(direction: Direction) {
  module.addEvent(`dpad${capitalize(direction)}.pressed`, (result) => {
    if (result[0].justChanged) {
      moveFocus(direction);
    } else {
      handleRepeat(direction, () => moveFocus(direction));
    }
  });

  module.addEvent(`dpad${capitalize(direction)}.released`, () => {
    resetRepeatState(direction);
  });
}

['right', 'left', 'up', 'down'].forEach((d) => addDpadEvents(d as Direction));

module.addEvent('dpadUp.pressed', (result) => {
  if (numberEditor.mode === 'edit') {
    if (result[0].justChanged) {
      incrementNumber();
    } else {
      handleRepeat('numberUp', incrementNumber);
    }
  }
});

module.addEvent('dpadUp.released', () => {
  resetRepeatState('numberUp');
});

module.addEvent('dpadDown.pressed', (result) => {
  if (numberEditor.mode === 'edit') {
    if (result[0].justChanged) {
      decrementNumber();
    } else {
      handleRepeat('numberDown', decrementNumber);
    }
  }
});

module.addEvent('dpadDown.released', () => {
  resetRepeatState('numberDown');
});

module.addEvent('R1.pressed', (result) => {
  if (result[0].justChanged) {
    tabNext();
  } else {
    handleRepeat('tabNext', tabNext);
  }
});

module.addEvent('R1.released', () => {
  resetRepeatState('tabNext');
});

module.addEvent('L1.pressed', (result) => {
  if (result[0].justChanged) {
    tabPrev();
  } else {
    handleRepeat('tabPrev', tabPrev);
  }
});

module.addEvent('L1.released', () => {
  resetRepeatState('tabPrev');
});

module.addEvent('R2.justPressed', () => {
  focusAfterContainer();
});

module.addEvent('L2.justPressed', () => {
  focusBeforeContainer();
});

module.addEvent('A.justPressed', () => {
  const current = document.activeElement as HTMLElement;

  if (current instanceof HTMLInputElement && current.type === 'color') {
    toggleColorEditor(current);
    return;
  }

  if (current instanceof HTMLInputElement && current.type === 'range') {
    toggleRangeEditor(current);
    return;
  }

  if (current instanceof HTMLInputElement && current.type === 'number') {
    toggleNumberEditor(current);
    return;
  }

  if (current instanceof HTMLInputElement && current.type === 'date') {
    toggleDateEditor(current);
    return;
  }

  if (current instanceof HTMLSelectElement) {
    toggleSelect(current);
    return;
  }

  if (current.classList.contains('card')) {
    current.click();
    return;
  }

  if (
    (current instanceof HTMLInputElement &&
      (current.type === 'text' || current.type === 'email' || !current.type)) ||
    current instanceof HTMLTextAreaElement
  ) {
    current.click();
    return;
  }

  current?.click();
});

function isTextInput(element: HTMLElement): boolean {
  return (
    (element instanceof HTMLInputElement &&
      (element.type === 'text' || element.type === 'email' || !element.type)) ||
    element instanceof HTMLTextAreaElement
  );
}

module.addEvent('A.justPressed', () => {
  const current = document.activeElement as HTMLElement;
  if (isTextInput(current)) {
    startListening();
  }
});

module.addEvent('A.justReleased', () => {
  stopListening();
});

module.addEvent('B.justPressed', () => {
  const current = document.activeElement as HTMLElement;
  if (current instanceof HTMLSelectElement) {
    toggleSelect(current);
  }
  cancelColorEditor();
  cancelRangeEditor();
  cancelNumberEditor();
  cancelDateEditor();
});

function deleteChar() {
  const current = document.activeElement as HTMLElement;

  if (
    (current instanceof HTMLInputElement &&
      (current.type === 'text' || current.type === 'email' || !current.type)) ||
    current instanceof HTMLTextAreaElement
  ) {
    const start = current.selectionStart ?? 0;
    if (start > 0) {
      const value = current.value;
      current.value = value.substring(0, start - 1) + value.substring(start);
      current.setSelectionRange(start - 1, start - 1);
      current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}

function uncheckFocused() {
  const current = document.activeElement as HTMLElement;
  if (current instanceof HTMLInputElement && current.type === 'checkbox' && current.checked) {
    current.checked = false;
    current.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

module.addEvent('X.pressed', (result) => {
  uncheckFocused();
  if (result[0].justChanged) {
    deleteChar();
  } else {
    handleRepeat('delete', deleteChar);
  }
});

module.addEvent('X.released', () => {
  resetRepeatState('delete');
});

document.addEventListener('focusout', (e) => {
  handleSelectFocusOut(e);
  handleColorFocusOut(e);
  handleRangeFocusOut(e);
  handleNumberFocusOut(e);
  handleDateFocusOut(e);
});

document.addEventListener('click', (e) => {
  handleSelectClick();

  const target = e.target as HTMLElement;
  const card = target.closest('.card') as HTMLElement | null;
  if (card) {
    if (!card.classList.contains('bounce-once')) {
      card.classList.add('bounce-once');
    }
    card.addEventListener(
      'animationend',
      () => {
        card.classList.remove('bounce-once');
      },
      { once: true },
    );
  }

  const btn = target.closest('.btn') as HTMLElement | null;
  if (btn) {
    btn.classList.remove('btn-burst');
    void btn.offsetWidth;
    btn.classList.add('btn-burst');
  }
});

module.addEvent('R.pressed', (result) => {
  const stickResult = result[0] as StickResult;
  const [x, y] = stickResult.value;
  const current = document.activeElement as HTMLElement;

  if (y < -0.2) {
    const amount = y * 10;
    if (!scrollElement(current, 'y', amount)) {
      window.scrollBy({ top: amount, behavior: 'instant' });
    }
  } else if (y > 0.2) {
    const amount = y * 10;
    if (!scrollElement(current, 'y', amount)) {
      window.scrollBy({ top: amount, behavior: 'instant' });
    }
  }

  if (x < -0.2) {
    const amount = x * 10;
    if (!scrollElement(current, 'x', amount)) {
      window.scrollBy({ left: amount, behavior: 'instant' });
    }
  } else if (x > 0.2) {
    const amount = x * 10;
    if (!scrollElement(current, 'x', amount)) {
      window.scrollBy({ left: amount, behavior: 'instant' });
    }
  }
});

generatePixelArtContainer().then((art: string) => {
  const pixelArtContainer = document.getElementById('pixel-art');
  if (pixelArtContainer) {
    pixelArtContainer.innerHTML = art;
  }

  const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;
  if (canvas) {
    attachCanvasUpdater(canvas);

    const colorOn = document.getElementById('color-on') as HTMLInputElement;
    const colorOff = document.getElementById('color-off') as HTMLInputElement;
    colorOn?.addEventListener('input', () => renderCheckboxesToCanvas(canvas));
    colorOff?.addEventListener('input', () => renderCheckboxesToCanvas(canvas));
  }
});

const fileInput = document.getElementById('image-upload') as HTMLInputElement;
const loadBtn = document.getElementById('load-image-btn');

loadBtn?.addEventListener('click', () => {
  fileInput?.click();
});

fileInput?.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  try {
    const thresholdInput = document.getElementById('threshold-input') as HTMLInputElement;
    const threshold = parseInt(thresholdInput?.value || '128', 10);

    const { matrix, columns, rows } = await loadImageAsMatrix(file, 60, threshold);

    setCanvasDimensions(columns, rows);

    const pixelArtContainer = document.getElementById('pixel-art');
    if (pixelArtContainer) {
      pixelArtContainer.innerHTML = generateCheckboxesFromMatrix(matrix, columns, rows);
    }

    const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;
    if (canvas) {
      attachCanvasUpdater(canvas);
      renderCheckboxesToCanvas(canvas);
    }

    const heading = document.getElementById('pixel-art-heading');
    if (heading) {
      heading.textContent = `Checkbox Art (${columns}x${rows})`;
    }
  } catch (error) {
    console.error('Failed to load image:', error);
  }

  fileInput.value = '';
});

const saveBtn = document.getElementById('save-image-btn');

saveBtn?.addEventListener('click', () => {
  const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = 'pixel-art.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

const pixelArtHeading = document.getElementById('pixel-art-heading');
if (pixelArtHeading) {
  pixelArtHeading.textContent = `Checkbox Art (${PIXEL_ART_SIZE}x${PIXEL_ART_SIZE})`;
}

initVoiceRecognition();

joymap.start();
