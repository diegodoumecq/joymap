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

class ReactExample extends React.Component {

    // Setup joymap
    componentWillMount() {
        const joyMap = createJoyMap({
            threshold: 0.2,
            // setState is called on each poll to force React to rerender
            onPoll: () => this.setState({})
        });

        const James = joyMap.addPlayer();
        James.invertSticks([true, true], 'L', 'R');

        this.players = [
            { name: 'James', player: James },
            { name: 'Juan', player: joyMap.addPlayer() },
            { name: 'John', player: joyMap.addPlayer() },
            { name: 'Jim', player: joyMap.addPlayer() }
        ];

        this.joyMap = joyMap;
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
                    {map(({ player, name }) => {
                        const color = colorHash.hex(name);
                        return (
                            <Gamepad
                                key={name}
                                name={name}
                                backgroundColor={color}
                                pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
                                player={player}>
                                <h2>{player.getPadId() || 'Player has no gamepad assigned'}</h2>
                            </Gamepad>);
                    }, this.players)}
                </section>
            </article>
        );
    }
}

// Unnecessary CSS modules decorator, catches all styleName props and applies the renamed className props
// Used to overcome global class namespaces in css!
const DecoratedReactExample = CSSModules(ReactExample, styles, { allowMultiple: true });

render(<DecoratedReactExample />, document.getElementById('app'));
