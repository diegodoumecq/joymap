import React from 'react';
import { render } from 'react-dom';

import Main from './Main';

const element = document.createElement('div');
document.body.appendChild(element);

render(<Main />, element);
