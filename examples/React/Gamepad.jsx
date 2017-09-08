import React from 'react';
import PropTypes from 'prop-types';

import { map } from 'lodash/fp';
import classnames from 'classnames';

import styles from './Gamepad.mstyl';

const analogInputs = ['L', 'R'];
const shoulderInputs = ['L2', 'L1', 'R2', 'R1'];
const digitalInputs = [
    'dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight',
    'A', 'B', 'X', 'Y',
    'start', 'select', 'home'
];

export default class Gamepad extends React.Component {

    static propTypes = {
        backgroundColor: PropTypes.string.isRequired,
        pressedColor: PropTypes.string.isRequired,
        module: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        children: PropTypes.node
    };

    state = {
        waiting: null
    };

    handleCancelRebind = () => {
        this.props.module.cancelListen();
        this.setState({ waiting: null });
    };

    renderStick(inputName) {
        const { pressedColor } = this.props;
        const [x, y] = this.props.module.getSticks(inputName).value;
        const { pressed } = this.props.module.getButtons(`${inputName}3`);

        return (
            <div
                key={inputName}
                className={styles[inputName]}
                onClick={() => {
                    const { module } = this.props;

                    if (module.isConnected()) {
                        module.stickBindOnPress(
                            inputName,
                            () => this.setState({ waiting: null })
                        );
                        this.setState({ waiting: inputName });
                    }
                }}
                style={{
                    transform: `translate(${x * 15}px, ${y * 15}px)`,
                    backgroundColor: pressed ? pressedColor : ''
                }}
            />);
    }

    renderDigital(inputName) {
        const { pressedColor } = this.props;
        const { pressed } = this.props.module.getButtons(inputName);

        return (
            <div
                key={inputName}
                className={styles[inputName]}
                onClick={() => {
                    const { module } = this.props;

                    if (module.isConnected()) {
                        module.buttonBindOnPress(
                            inputName,
                            () => this.setState({ waiting: null })
                        );
                        this.setState({ waiting: inputName });
                    }
                }}
                style={{
                    backgroundColor: pressed ? pressedColor : ''
                }}
            />);
    }

    renderShoulder(inputName) {
        const { value } = this.props.module.getButtons(inputName);

        return (
            <div key={inputName} style={{
                transform: `translateY(${value * 10}px)`,
                width: '100%',
                height: '100%'
            }}>
                <div className={styles[inputName]} />
            </div>);
    }

    render() {
        const { module, backgroundColor, pressedColor, children, name } = this.props;
        const { waiting } = this.state;

        return (
            <div
                style={{ backgroundColor }}
                className={classnames(styles.gamepad, {
                    [styles.disconnected]: !module.isConnected(),
                    [styles.waiting]: !!waiting
                })}
            >
                <div className={styles.reactInputs}>
                    <span className={styles.moduleName} style={{ color: pressedColor }}>
                        {name}
                    </span>
                    <div className={styles.back} />
                    {map(inputName => this.renderShoulder(inputName), shoulderInputs)}
                    {map(inputName => this.renderStick(inputName), analogInputs)}
                    {map(inputName => this.renderDigital(inputName), digitalInputs)}
                </div>
                {!waiting ? null :
                    <div className={styles.waitingMessage} onClick={this.handleCancelRebind}>
                        Rebinding {waiting}
                    </div>}
                {children}
            </div>);
    }
}
