import React from 'react';
import { render } from 'react-dom';
import { map } from 'lodash/fp';
import ColorHash from 'color-hash';

import { createJoyMap, createQueryModule } from '../../src/index';
import Root from './Root';

const joyMap = createJoyMap();
const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

const names = ['James', 'Juan', 'John', 'Jim'];

// Create a list of players to render
const players = map((name) => {
  const player = {
    name,
    color: colorHash.hex(name),
    module: createQueryModule(),
  };
  // Add the module to JoyMap
  joyMap.addModule(player.module);
  return player;
}, names);

// Invert both of the first player's sticks
players[0].module.invertSticks([true, true], 'L', 'R');

// Render the root component onto the app html container
render(<Root players={players} joyMap={joyMap} />, document.getElementById('app'));
