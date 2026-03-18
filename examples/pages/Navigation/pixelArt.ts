import logoUrl from '@/examples/assets/logo.png';
import { urlToCheckboxMatrix } from './imgToCheckboxes';

export const PIXEL_ART_SIZE = 60;

export const pixelArtGridPromise = urlToCheckboxMatrix(logoUrl, {
  width: PIXEL_ART_SIZE,
  height: PIXEL_ART_SIZE,
});

export async function generatePixelArtContainer() {
  const pixelArtGrid = await pixelArtGridPromise;
  let html = `<div class="grid grid-cols-[repeat(${PIXEL_ART_SIZE},20px)] gap-0">`;

  for (let y = 0; y < pixelArtGrid.length; y++) {
    for (let x = 0; x < pixelArtGrid[y].length; x++) {
      const checked = pixelArtGrid[y][x] === 1 ? 'checked' : '';
      html += `<input type="checkbox" class="pixel" ${checked} />`;
    }
  }

  html += '</div>';

  return html;
}
