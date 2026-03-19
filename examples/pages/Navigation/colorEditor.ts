export type ColorEditorState = {
  element: HTMLInputElement | null;
  originalValue: string;
  mode: 'view' | 'edit';
};

export const colorEditor: ColorEditorState = { element: null, originalValue: '', mode: 'view' };

let currentHSL = { h: 0, s: 0, l: 0 };

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 100, 50];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function updateColorLabel() {
  let label = document.getElementById('color-label');
  if (!label) {
    label = document.createElement('span');
    label.id = 'color-label';
    label.className =
      'fixed rounded border border-purple-500 bg-gray-800 px-2 py-1 text-sm text-white';
    label.style.display = 'none';
    document.body.appendChild(label);
  }

  if (colorEditor.element && colorEditor.mode === 'edit') {
    const { h, s, l } = currentHSL;
    label.textContent = `H:${h}° S:${s}% L:${l}%`;
    label.style.display = 'block';

    const rect = colorEditor.element.getBoundingClientRect();
    label.style.left = `${rect.right + 8}px`;
    label.style.top = `${rect.top}px`;
  } else {
    label.style.display = 'none';
  }
}

export function toggleColorEditor(element: HTMLInputElement) {
  if (colorEditor.mode === 'edit') {
    colorEditor.mode = 'view';
    colorEditor.element = null;
  } else {
    colorEditor.mode = 'edit';
    colorEditor.element = element;
    colorEditor.originalValue = element.value;
    const [h, s, l] = hexToHsl(element.value);
    currentHSL = { h, s, l };
  }
  updateColorLabel();
}

export function cancelColorEditor() {
  if (colorEditor.mode === 'edit' && colorEditor.element) {
    colorEditor.element.value = colorEditor.originalValue;
    const [h, s, l] = hexToHsl(colorEditor.originalValue);
    currentHSL = { h, s, l };
    colorEditor.mode = 'view';
    colorEditor.element = null;
    updateColorLabel();
  }
}

export function handleColorDirection(
  element: HTMLInputElement,
  direction: 'up' | 'down' | 'left' | 'right',
) {
  const { h, s, l } = currentHSL;

  let newH = h;
  let newL = l;

  if (direction === 'up') {
    newH = (h + 1) % 360;
  } else if (direction === 'down') {
    newH = (h - 1 + 360) % 360;
  } else if (direction === 'right') {
    newL = Math.min(100, l + 1);
  } else if (direction === 'left') {
    newL = Math.max(0, l - 1);
  }

  let effectiveS = s;
  if (newL <= 15 || newL >= 85) {
    effectiveS = 100;
  }

  currentHSL = { h: newH, s: effectiveS, l: newL };
  element.value = hslToHex(newH, effectiveS, newL);
  element.dispatchEvent(new Event('input', { bubbles: true }));
  updateColorLabel();
}

export function handleColorFocusOut(e: FocusEvent) {
  const target = e.target;
  if (target instanceof HTMLInputElement && target.type === 'color') {
    if (colorEditor.mode === 'edit') {
      colorEditor.mode = 'view';
      colorEditor.element = null;
      updateColorLabel();
    }
  }
}

export function handleColorClick() {
  if (colorEditor.mode === 'edit') {
    colorEditor.mode = 'view';
    colorEditor.element = null;
    updateColorLabel();
  }
}
