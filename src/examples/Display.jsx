import React from 'react';

import { map } from 'lodash/fp';
import ColorHash from 'color-hash';
import tinycolor from 'tinycolor2';

import JoyMap from '../lib/JoyMap';
import Gamepad from './Gamepad.jsx';

const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

function shadeColor2(color, percent) {   
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ?percent * -1 : percent;
    const R = f >> 16;
    const G = f >> 8 & 0x00FF;
    const B = f & 0x0000FF;
    return "#" + (
        0x1000000 + (Math.round((t-R)*p)+R) * 0x10000 + (Math.round((t-G)*p)+G) * 0x100 + (Math.round((t-B)*p) + B)
    ).toString(16).slice(1);
}

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
                {map((player) =>
                    <Gamepad
                        key={player.name}
                        backgroundColor={colorHash.hex(player.name)}
                        pressedColor={tinycolor(colorHash.hex(player.name)).darken(20)}
                        player={player}>
                        <h2>{!!player.gamepadId ? player.gamepadId : 'Player has no gamepad associated'}</h2>
                    </Gamepad>, this.joyMap.players)}

            </section>);
    }
}
