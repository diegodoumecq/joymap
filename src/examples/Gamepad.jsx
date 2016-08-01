import React from 'react';

import { map } from 'lodash/fp';
import classnames from 'classnames';

import './Gamepad.styl';

const analogInputs = [
    'leftAnalog', 'rightAnalog'
];

const digitalInputs = [
    'dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight',
    'A', 'B', 'X', 'Y',
    'start', 'select', 'home'
];

const shoulderInputs = [
    'L2', 'L1', 'R2', 'R1'
];

export default class Gamepad extends React.Component {

    renderAnalogStick(inputName) {
        const { gamepad } = this.props;
        const inputX = gamepad.getState(inputName + 'X').value;
        const inputY = gamepad.getState(inputName + 'Y').value;

        return (
            <div
                key={inputName}
                className={classnames(inputName, {
                    pressed: gamepad.getState((inputName === 'leftAnalog') ? 'L3' : 'R3').value
                })}
                style={{
                    transform: `translate(${inputX * 15}px, ${inputY * 15}px)`
                }} />);
    }

    renderDigital(inputName) {
        const { state } = this.props.gamepad.getState(inputName);

        return (
            <div
                key={inputName}
                className={classnames(inputName, {
                    pressed: !!state && state !== 'released' && state !== 'justReleased'
                })} />);
    }

    renderShoulder(inputName) {
        const value = this.props.gamepad.getState(inputName).value || 0;
        
        return (
            <div
                key={inputName}
                style={{
                    transform: `translateY(${value * 10}px)`,
                    width: '100%',
                    height: '100%'
                }}>
                <div className={inputName} />
            </div>);
    }

    render() {
        const { gamepad } = this.props;

        return (
            <div className={classnames('gamepad', { disconnected: !gamepad.connected })}>
                <div className="react-inputs">
                    <div className="back" />
                    {map((input) => this.renderAnalogStick(input), analogInputs)}
                    {map((input) => this.renderDigital(input), digitalInputs)}
                    {map((input) => this.renderShoulder(input), shoulderInputs)}
                </div>
                <div className="count">Buttons pressed in total: {gamepad.getState('CountAll').value}</div>
            </div>);
    }
}
