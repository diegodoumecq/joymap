import { marked, Renderer } from 'marked';

import readme from '../../../README.md?raw';

function cleanSelfRef(str: string) {
  return str
    .replace(
      '[Lots of handy examples](https://diegodoumecq.github.io/joymap/)',
      'Lots of handy examples',
    )
    .replace(
      '* You can play with our examples here: https://diegodoumecq.github.io/joymap/ (includes handy links to stackblitz and the github source code)',
      '* Navigate through the navbar to see the examples',
    );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

const renderer = new Renderer();
renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
  const id = slugify(text);
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

marked.use({ renderer });

document.body.innerHTML = `
  <div style="padding: 2rem; color: #EEE; font-family: sans-serif; display: flex; justify-content: center;">
    <div style="max-width: 1000px;">
    ${marked(cleanSelfRef(readme))}
    </div>
  </div>
`;
