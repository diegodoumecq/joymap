import React from 'react';

import { map } from 'lodash/fp';
import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

import JoyMap from '../../src/JoyMap';
import Gamepad from './Gamepad.jsx';

const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

export default class Display extends React.Component {

    componentWillMount() {
        const joyMap = new JoyMap({ threshold: 0.2 });

        // Force React to rerender after each joymap.poll
        // poll is called roughly 60 times a second, using requestAnimationFrame
        joyMap.onPoll = () => this.setState({});

        joyMap.addPlayer('James');
        joyMap.addPlayer('Juan');
        joyMap.addPlayer('John');
        joyMap.addPlayer('Jim');

        const { L } = joyMap.players.James.sticks;
        L.invertX = true;
        L.invertY = true;

        this.joyMap = joyMap;
    }

    componentDidMount() {
        this.joyMap.start();
    }

    componentWillUnmount() {
        this.joyMap.stop();
    }

    render() {
        return (
            <section className="html-example">
                {map(player => {
                    const color = colorHash.hex(player.name);
                    return (
                        <Gamepad
                            key={player.name}
                            backgroundColor={color}
                            pressedColor={tinycolor(color).darken(20)}
                            player={player}>
                            <h2>{player.gamepadId || 'Player has no gamepad associated'}</h2>
                        </Gamepad>);
                }, this.joyMap.players)}
            </section>);
    }
}
