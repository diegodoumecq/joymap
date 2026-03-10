import React, { useEffect, useState } from 'react';
import ColorHash from 'color-hash';
import { createJoymap, createQueryModule, QueryModule } from 'joymap';
import { createRoot } from 'react-dom/client';
import tinycolor from 'tinycolor2';

import Gamepad from './Gamepad';

interface Player {
  name: string;
  module: QueryModule;
  color: string;
}

const joymap = createJoymap();
const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

const names = ['James', 'Juan', 'John', 'Jim'];

// Create a list of players to render
const players: Player[] = names.map((name) => {
  const module = createQueryModule();
  joymap.addModule(module);

  return {
    name,
    module,
    color: colorHash.hex(name),
  };
});

// Invert both of the first player's sticks
// players[0].module.invertSticks([true, true], 'L', 'R');

function Main() {
  const [, updateState] = useState(true);

  useEffect(() => {
    joymap.setOnPoll(() => updateState((s) => !s));
    joymap.start();

    return joymap.stop;
  }, []);

  return (
    <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <header style={{ textAlign: 'center' }}>
        <h3>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</h3>
      </header>
      <section className="mt-4 flex w-full flex-row flex-wrap justify-center gap-4">
        {players.map(({ module, name, color }) => (
          <Gamepad
            key={name}
            name={name}
            module={module}
            backgroundColor={color}
            pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
          >
            <span
              style={{
                background: '#00000033',
                padding: '0.5rem 1rem 0.5rem 1rem',
                borderRadius: 20,
                color: '#FFF',
              }}
            >
              {module.getPadId() || 'Player has no gamepad assigned'}
            </span>
          </Gamepad>
        ))}
      </section>
    </div>
  );
}

// Render the root component onto the app html container
const root = createRoot(document.getElementById('app')!);
root.render(<Main />);
