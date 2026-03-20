import { PIXEL_ART_SIZE } from './pixelArt';

export let currentColumns = PIXEL_ART_SIZE;
export let currentRows = PIXEL_ART_SIZE;

export function setCanvasDimensions(columns: number, rows: number) {
  currentColumns = columns;
  currentRows = rows;
}

export function renderCheckboxesToCanvas(canvas: HTMLCanvasElement, pixelSize: number = 2) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const onColor = (document.getElementById('color-on') as HTMLInputElement)?.value || '#5700fa';
  const offColor = (document.getElementById('color-off') as HTMLInputElement)?.value || '#ffffff';

  canvas.width = currentColumns * pixelSize;
  canvas.height = currentRows * pixelSize;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  const checkboxes = document.querySelectorAll<HTMLInputElement>('.pixel');

  checkboxes.forEach((checkbox) => {
    const index = parseInt(checkbox.dataset.index || '0');
    const x = index % currentColumns;
    const y = Math.floor(index / currentColumns);

    ctx.fillStyle = checkbox.checked ? onColor : offColor;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  });
}

export function attachCanvasUpdater(canvas: HTMLCanvasElement) {
  const update = () => renderCheckboxesToCanvas(canvas);

  document.querySelectorAll<HTMLInputElement>('.pixel').forEach((cb) => {
    cb.removeEventListener('change', update);
    cb.addEventListener('change', update);
  });

  update();
}
