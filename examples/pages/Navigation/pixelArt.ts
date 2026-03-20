import logoUrl from '@/examples/assets/logo.png';
import { urlToCheckboxMatrix } from './imgToCheckboxes';

export const PIXEL_ART_SIZE = 60;

export const pixelArtGridPromise = urlToCheckboxMatrix(logoUrl, {
  width: PIXEL_ART_SIZE,
  height: PIXEL_ART_SIZE,
});

export async function generatePixelArtContainer() {
  const pixelArtGrid = await pixelArtGridPromise;
  return generateCheckboxesFromMatrix(pixelArtGrid, PIXEL_ART_SIZE, PIXEL_ART_SIZE);
}

export function generateCheckboxesFromMatrix(
  matrix: number[][],
  columns: number,
  rows: number,
): string {
  let html = `<div class="grid gap-0" style="grid-template-columns: repeat(${columns}, 20px);">`;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const checked = matrix[y][x] === 1 ? 'checked' : '';
      html += `<input type="checkbox" class="pixel" data-index="${y * columns + x}" ${checked} />`;
    }
  }

  html += '</div>';

  return html;
}
