import { render } from 'react-dom';
import React from 'react';
import CSSModules from 'react-css-modules';

import { map } from 'lodash/fp';
import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

import styles from './React.mstyl';

import createJoyMap from '../../src/JoyMap';
import Gamepad from './Gamepad.jsx';

const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

function joyMapSetup(params) {
    const joyMap = createJoyMap({ threshold: 0.2, ...params });

    const James = joyMap.addPlayer('James');
    joyMap.addPlayer('Juan');
    joyMap.addPlayer('John');
    joyMap.addPlayer('Jim');

    James.invertSticks([true, true], 'L', 'R');

    return joyMap;
}

class ReactExample extends React.Component {

    // Setup joymap
    componentWillMount() {
        // setSTate is called to force React to rerender after each poll
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
                        const color = colorHash.hex(player.getName());
                        return (
                            <Gamepad
                                key={player.getName()}
                                backgroundColor={color}
                                pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
                                player={player}>
                                <h2>{player.getPadId() || 'Player has no gamepad associated'}</h2>
                            </Gamepad>);
                    }, this.joyMap.getPlayers())}
                </section>
            </article>
        );
    }
}

const CSSModuledExample = CSSModules(ReactExample, styles, { allowMultiple: true });

render(<CSSModuledExample />, document.getElementById('app'));
