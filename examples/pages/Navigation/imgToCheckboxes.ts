export function urlToCheckboxMatrix(
  url: string,
  size?: { width: number; height: number },
  threshold: number = 128,
): Promise<number[][]> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // ⚠️ Important for cross-origin images
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject('Canvas not supported');
        return;
      }

      const width = size?.width || img.width;
      const height = size?.height || img.height;

      canvas.width = width;
      canvas.height = height;

      // Draw image (resize if needed)
      ctx.drawImage(img, 0, 0, width, height);

      const { data } = ctx.getImageData(0, 0, width, height);

      const result: number[][] = [];

      for (let y = 0; y < height; y++) {
        const row: number[] = [];

        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Convert to grayscale
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          // Threshold to 1 or 0
          row.push(gray < threshold ? 1 : 0);
        }

        result.push(row);
      }

      resolve(result);
    };

    img.onerror = () => reject('Failed to load image');

    img.src = url;
  });
}

export interface ImageMatrix {
  matrix: number[][];
  columns: number;
  rows: number;
}

export async function loadImageAsMatrix(
  file: File,
  maxSize: number = 60,
  threshold: number = 128,
): Promise<ImageMatrix> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const aspectRatio = img.width / img.height;

      let columns: number;
      let rows: number;

      if (aspectRatio >= 1) {
        columns = maxSize;
        rows = Math.round(maxSize / aspectRatio);
      } else {
        columns = Math.round(maxSize * aspectRatio);
        rows = maxSize;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject('Canvas not supported');
        return;
      }

      canvas.width = columns;
      canvas.height = rows;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, columns, rows);

      const scale = Math.min(columns / img.width, rows / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const offsetX = (columns - scaledWidth) / 2;
      const offsetY = (rows - scaledHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

      const { data } = ctx.getImageData(0, 0, columns, rows);

      const matrix: number[][] = [];

      for (let y = 0; y < rows; y++) {
        const row: number[] = [];
        for (let x = 0; x < columns; x++) {
          const i = (y * columns + x) * 4;
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          row.push(gray < threshold ? 1 : 0);
        }
        matrix.push(row);
      }

      resolve({ matrix, columns, rows });
    };

    img.onerror = () => reject('Failed to load image');
    img.src = URL.createObjectURL(file);
  });
}
