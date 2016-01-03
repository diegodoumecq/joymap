import React from 'react';
import JoyMap from '../lib/JoyMap';

const inputs = ['leftAnalog', 'rightAnalog', 'dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight', 'L2', 'L1', 'R2', 'R1', 'A', 'B', 'X', 'Y', 'start', 'select', 'home'];

export default class Display extends React.Component {
	constructor() {
        super(...arguments);

        const joyMap = new JoyMap(0.2);

        joyMap.setAlias('CountAll', (mappedValues) => {
            let count = 0;

            // TODO Make the analog axes count as one for each stick
            joyMap.getSupportedInputs().forEach((name) => {
                const state = mappedValues[name].state;
                count += (state !== 'released' && state !== 'justReleased') ? 1 : 0;
            });
            
            return count;
        });

        joyMap.init();

        this.state = {
            option: null,
            joyMap
        };

        this.handleChange = this.handleChange.bind(this);
        this.step = this.step.bind(this);
    }

    componentDidMount() {
        this.step();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.state.animationFrame);
    }

    step() {
        this.setState({
            animationFrame: window.requestAnimationFrame(this.step),
            random: Math.random()
        });
    }

    handleChange(event) {
        if (event.currentTarget.value !== this.state.value) {
            this.setState({ option: event.currentTarget.value });
        }
    }

    render() {
        const { joyMap } = this.state;

        return (
            <section className="display-component">
                {joyMap.gamepads.map((gamepad) => (
                    <div className="gamepad" key={gamepad.index}>
                        <div className="inputs">
                            <div className="back" />
                            {inputs.map((inputName) => {
                                let className = inputName;
                                const style = {};

                                if (inputName.indexOf('Analog') !== -1) {
                                    //Analog sticks
                                    const inputX = gamepad.getState(inputName+'X').value;
                                    const inputY = gamepad.getState(inputName+'Y').value;

                                    style.transform = 'translate(' + (inputX * 15) + 'px, ' + (inputY * 15) + 'px)';

                                    if (gamepad.getState((inputName === 'leftAnalog') ? 'L3' : 'R3').value) {
                                        className += ' pressed';
                                    }
                                } else {
                                    const input = gamepad.getState(inputName);
                                    
                                    if (inputName.indexOf('L') === 0) {
                                        style.transform = 'translateY(' + (input.value * 10) + 'px)';
                                        style.width = '100%';
                                        style.height = '100%';
                                        return <div style={style}><div className={className} key={inputName} /></div>;
                                    } else if (inputName.indexOf('R') === 0) {
                                        style.transform = 'translateY(' + (input.value * 10) + 'px)';
                                        style.width = '100%';
                                        style.height = '100%';
                                        return <div style={style}><div className={className} key={inputName} /></div>;
                                    }

                                    if (input.state !== 'released' && input.state !== 'justReleased') {
                                        className += ' pressed';
                                    }
                                }

                                return (<div className={className} style={style} key={inputName} />);
                            })}
                        </div>
                        <div className="count">Buttons pressed in total: {gamepad.getState('CountAll').value}</div>
                    </div>
                ))}
            </section>
        );
    }
}
