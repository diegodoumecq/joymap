import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import { map } from 'lodash/fp';
import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

import styles from './React.mstyl';

import { createJoyMap, createQueryModule } from '../../src/index';
import Gamepad from './Gamepad.jsx';

const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

const connectJoyMap = WrappedComponent => {
    // Setup joymap
    const joyMap = createJoyMap();
    const James = createQueryModule();
    James.invertSticks([true, true], 'L', 'R');

    const players = [
        { name: 'James', module: James },
        { name: 'Juan', module: createQueryModule() },
        { name: 'John', module: createQueryModule() },
        { name: 'Jim', module: createQueryModule() }
    ];

    joyMap.addModule(James);
    joyMap.addModule(players[1].module);
    joyMap.addModule(players[2].module);
    joyMap.addModule(players[3].module);

    return class Wrapper extends React.Component {
        componentWillMount() { joyMap.setOnPoll(() => this.forceUpdate()); }
        componentDidMount = () => joyMap.start();
        componentWillUnmount = () => joyMap.stop();
        render = () => <WrappedComponent players={players} joyMap={joyMap} />;
    };
};

const ReactExample = ({ players }) => (
    <article className={styles['examples-container']}>
        <header>
            <h1 className={styles.title}>JoyMap React example</h1>
            <span>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</span>
        </header>
        <section className={styles.reactExample}>
            {map(({ module, name }) => {
                const color = colorHash.hex(name);
                return (
                    <Gamepad
                        key={name}
                        name={name}
                        backgroundColor={color}
                        pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
                        module={module}
                    >
                        <h2>{module.getPadId() || 'Player has no gamepad assigned'}</h2>
                    </Gamepad>);
            }, players)}
        </section>
    </article>
);

ReactExample.propTypes = {
    players: PropTypes.array
};

const DecoratedReactExample = connectJoyMap(ReactExample);

render(<DecoratedReactExample />, document.getElementById('app'));
