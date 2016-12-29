import React from 'react';
import { findDOMNode } from 'react-dom';

import { some } from 'lodash/fp';

import JoyMap from '../../src/JoyMap';

import './Movement.styl';

const SIZE = {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300
};

// IDEA: Add another example where a new player avatar is added to the game for each new gamepad

export default class Movement extends React.Component {

    componentWillMount() {
        this.joyMap = new JoyMap({ threshold: 0.2 });
        this.joyMap.onPoll = () => {
            this.updateMascot();
            this.drawCanvas();
        };

        this.mainPlayer = this.joyMap.addPlayer('mainPlayer');
        this.mainPlayer.setAggregator('AnyButton', ({ buttons }) => some('pressed', buttons));

        this.mascot = {
            x: SIZE.centerX,
            y: SIZE.centerY,
            angle: 45
        };

        this.img = new Image();
        this.img.src = 'gamepad.png';
    }

    componentDidMount() {
        const canvas = findDOMNode(this.refs.canvas);
        const ctx = canvas.getContext('2d');

        this.setState({ canvas, ctx });
        this.joyMap.start();
    }

    componentWillUnmount() {
        this.joyMap.stop();
    }

    updateMascot() {
        const { L, R } = this.mainPlayer.sticks;

        // Move the mascot itself
        this.mascot.x += L.value.x * 3;
        this.mascot.y += L.value.y * 3;

        // Don't assign a new angle if the stick isn't being used
        if (R.pressed) {
            this.mascot.angle = Math.atan2(R.value.y, R.value.x) + (Math.PI * 0.5);
        }
    }

    drawCanvas() {
        const { x, y, angle } = this.mascot;
        const { ctx } = this.state;

        // Draw background color, clearing previous image
        ctx.fillStyle = !this.mainPlayer.aggregators.AnyButton.value ? '#EEE' : '#DEE';
        ctx.fillRect(0, 0, SIZE.width, SIZE.height);

        // Rotate whole canvas
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);

        // Draw straight image on the rotated canvas
        ctx.drawImage(this.img, x - 242, y - 150, 484, 300);

        // Unrotate canvas to straighten it
        ctx.translate(x, y);
        ctx.rotate(-angle);
        ctx.translate(-x, -y);
    }

    render = () => (
        <div className="movement-example">
            <canvas ref="canvas" width={SIZE.width} height={SIZE.height} />
        </div>);
}
