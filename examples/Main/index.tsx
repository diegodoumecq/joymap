import { createRoot } from 'react-dom/client';

import './globals.css';

import { Main } from './Main';

const element = document.createElement('div');
document.body.appendChild(element);

const root = createRoot(element);
root.render(<Main />);

