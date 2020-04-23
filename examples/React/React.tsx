import React, { useEffect, useCallback, useState } from 'react';
import { render } from 'react-dom';
import { createJoymap, createQueryModule, QueryModule } from '../../src/index';
import { map } from 'lodash/fp';
import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

import Gamepad from './Gamepad';

import { ReactExample } from './styles';

interface Player {
  name: string;
  module: QueryModule;
  color: string;
}

const joymap = createJoymap();
const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

const names = ['James', 'Juan', 'John', 'Jim'];

// Create a list of players to render
const players: Player[] = map((name) => {
  const module = createQueryModule();
  joymap.addModule(module);

  return {
    name,
    module,
    color: colorHash.hex(name),
  };
}, names);

// Invert both of the first player's sticks
players[0].module.invertSticks([true, true], 'L', 'R');

function Root() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    joymap.setOnPoll(forceUpdate);
    joymap.start();

    return () => {
      joymap.stop();
    };
  }, []);

  return (
    <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <header style={{ textAlign: 'center' }}>
        <h3>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</h3>
      </header>
      <ReactExample>
        {map(
          ({ module, name, color }) => (
            <Gamepad
              key={name}
              name={name}
              module={module}
              backgroundColor={color}
              pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
            >
              <h3>{module.getPadId() || 'Player has no gamepad assigned'}</h3>
            </Gamepad>
          ),
          players,
        )}
      </ReactExample>
    </div>
  );
}

// Render the root component onto the app html container
render(<Root />, document.getElementById('app'));
