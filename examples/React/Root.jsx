import React from 'react';
import PropTypes from 'prop-types';

import { map } from 'lodash/fp';
import tinycolor from 'tinycolor2';

import styles from './Root.mstyl';
import Gamepad from './Gamepad.jsx';

export default class Root extends React.Component {
    static propTypes = {
        players: PropTypes.array,
        joyMap: PropTypes.object
    };

    componentDidMount = () => {
        this.props.joyMap.setOnPoll(() => this.forceUpdate());
        this.props.joyMap.start();
    }

    componentWillUnmount = () => this.props.joyMap.stop();

    render = () => {
        const { players } = this.props;

        return (
            <article className={styles['examples-container']}>
                <header>
                    <h1 className={styles.title}>JoyMap React example</h1>
                    <span>Connect one or more Gamepads. Use them. Click on buttons to rebind them.</span>
                </header>
                <section className={styles.reactExample}>
                    {map(({ module, name, color }) => (
                        <Gamepad
                            key={name}
                            name={name}
                            backgroundColor={color}
                            pressedColor={`#${tinycolor(color).darken(20).toHex()}`}
                            module={module}
                        >
                            <h2>{module.getPadId() || 'Player has no gamepad assigned'}</h2>
                        </Gamepad>
                    ), players)}
                </section>
            </article>
        );
    }
}
