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

