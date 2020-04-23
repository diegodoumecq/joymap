import marked from 'marked';
import readme from '../../../README.md';

function cleanSelfRef(str: string) {
  return str
    .replace(
      '[Lots of handy examples](https://diegodoumecq.github.io/joymap/)',
      'Lots of handy examples',
    )
    .replace(
      '* You can play with our examples here: https://diegodoumecq.github.io/joymap/ (includes handy links to codesandbox and the github source code)',
      '* Navigate through the sidebar to see the examples',
    );
}

document.body.innerHTML = `
  <div style="padding: 2rem; font-family: sans-serif; display: flex; justify-content: center;">
    <div style="max-width: 1000px;">
    ${marked(cleanSelfRef(readme))}
    </div>
  </div>
`;
