import { render } from 'react-dom';
import React from 'react';
import CSSModules from 'react-css-modules';

import { map } from 'lodash/fp';
import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

import styles from './React.mstyl';

import JoyMap from '../../src/JoyMap';
import Gamepad from './Gamepad.jsx';

const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

function joyMapSetup(params) {
    const joyMap = JoyMap({ threshold: 0.2, ...params });

    joyMap.addPlayer('James');
    joyMap.addPlayer('Juan');
    joyMap.addPlayer('John');
    joyMap.addPlayer('Jim');

    const { L } = joyMap.players.James.sticks;
    L.inverts = [true, true];

    return joyMap;
}

class ReactExample extends React.Component {

    // Setup joymap
    componentWillMount() {
        // Force React to rerender after each joymap.poll
        // poll is called roughly 60 times a second, using requestAnimationFrame
        this.joyMap = joyMapSetup({ onPoll: () => this.setState({}) });
    }

    // Tell joymap to start polling the gamepads
    componentDidMount = () => this.joyMap.start();

    // Tell joymap to stop polling the gamepads
    componentWillUnmount = () => this.joyMap.stop();

    render() {
        return (
            <article styleName="examples-container">
                <header>
                    <h1 styleName="title">JoyMap React example</h1>
                    <span>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</span>
                </header>
                <section styleName="react-example">
                    {map(player => {
                        const color = colorHash.hex(player.name);
                        return (
                            <Gamepad
                                key={player.name}
                                backgroundColor={color}
                                pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
                                player={player}>
                                <h2>{player.gamepadId || 'Player has no gamepad associated'}</h2>
                            </Gamepad>);
                    }, this.joyMap.players)}
                </section>
            </article>
        );
    }
}

const CSSModuledExample = CSSModules(ReactExample, styles, { allowMultiple: true });

render(<CSSModuledExample />, document.getElementById('app'));
