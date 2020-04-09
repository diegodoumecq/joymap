import React, { useEffect, useCallback, useState } from 'react';
import { map } from 'lodash/fp';
import tinycolor from 'tinycolor2';

import { JoyMap, QueryModule } from '../../src/index';

import { ReactExample } from './styles';
import '../main.styl';
import Gamepad from './Gamepad';

interface Player {
  name: string;
  color: string;
  module: QueryModule;
}

interface RootProps {
  joyMap: JoyMap;
  players: Player[];
}

export default function Root({ joyMap, players }: RootProps) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    joyMap.setOnPoll(forceUpdate);
    joyMap.start();

    return () => {
      joyMap.stop();
    };
  }, []);

  return (
    <article className="examples-container">
      <header>
        <h1 className="title">JoyMap React example</h1>
        <span>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</span>
      </header>
      <ReactExample>
        {map(
          ({ module, name, color }) => (
            <Gamepad
              key={name}
              name={name}
              backgroundColor={color}
              pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
              module={module}
            >
              <h2>{module.getPadId() || 'Player has no gamepad assigned'}</h2>
            </Gamepad>
          ),
          players,
        )}
      </ReactExample>
    </article>
  );
}
