import React from 'react';

import { map, forEach } from 'lodash/fp';

import JoyMap from '../lib/JoyMap';
import Gamepad from './Gamepad.jsx';

export default class Display extends React.Component {

	constructor() {
        super(...arguments);

        this.joyMap = new JoyMap(0.2);

        this.joyMap.setAlias('CountAll', (mappedValues) => {
            let count = 0;

            // TODO Make the analog axes count as one for each stick
            forEach((name) => {
                const state = mappedValues[name].state;
                count += (state !== 'released' && state !== 'justReleased') ? 1 : 0;
            }, this.joyMap.getSupportedInputs());
            
            return count;
        });

        this.joyMap.start();
    }

    componentDidMount() {
        this.step();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.animationFrame);
    }

    step = () => {
        this.animationFrame = window.requestAnimationFrame(this.step);
        this.setState({});
    };

    render() {
        return (
            <section className="display-component">
                {map((gamepad) => <Gamepad key={gamepad.id} gamepad={gamepad} />, this.joyMap.gamepads)}
            </section>);
    }
}
