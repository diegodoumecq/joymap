import marked from 'marked';
import readme from '../../../README.md';

document.body.innerHTML = `
  <div style="padding: 2rem; font-family: sans-serif; display: flex; justify-content: center;">
    <div style="max-width: 1000px;">
    ${marked(readme)}
    </div>
  </div>
`;
