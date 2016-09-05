import React from 'react';

import { map, forEach } from 'lodash/fp';
import ColorHash from 'color-hash';

import JoyMap from '../lib/JoyMap';
import Gamepad from './Gamepad.jsx';

const colorHash = new ColorHash({ saturation: [0.1, 0.7, 0.8], lightness: 0.5 });

export default class Display extends React.Component {

    componentWillMount() {
        this.joyMap = new JoyMap({ threshold: 0.2 });

        this.joyMap.setAlias('CountAll', (mappedValues) => {
            let count = 0;

            // TODO Make the analog axes count as one for each stick
            forEach((name) => {
                const state = mappedValues[name].state;
                count += (state !== 'released' && state !== 'justReleased') ? 1 : 0;
            }, this.joyMap.getSupportedInputs());
            
            return count;
        });

        // Force React to rerender after each joymap.poll
        // poll is called roughly 60 times a second, using requestAnimationFrame
        this.joyMap.onPoll = () => this.setState({});
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
                {map((gamepad) =>
                <Gamepad
                    key={gamepad.id}
                    backgroundColor={colorHash.hex(gamepad.id)}
                    gamepad={gamepad} />, this.joyMap.gamepads)}
                {this.joyMap.gamepads.length === 0 ? <h2>Connect a gamepad and push the buttons</h2> : null}
            </section>);
    }
}
