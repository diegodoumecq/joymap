import React from 'react';
import ReactDOM from 'react-dom';

import { map, forEach } from 'lodash/fp';

import JoyMap from '../lib/JoyMap';

import './Movement.styl';

const SIZE = {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300
};

export default class Movement extends React.Component {

    componentWillMount() {
        this.joyMap = new JoyMap({ threshold: 0.2 });
        this.joyMap.onPoll = this.step;

        this.player = {
            x: SIZE.centerX,
            y: SIZE.centerY,
            angle: 45
        };
    }

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        const ctx = canvas.getContext('2d');

        this.setState({ canvas, ctx });
        this.joyMap.start();
    }

    componentWillUnmount() {
        this.joyMap.stop();
    }

    step = () => {
        const leftAnalog = {
            x: this.joyMap.getState('leftAnalogX'),
            y: this.joyMap.getState('leftAnalogY')
        };
        const rightAnalog = {
            x: this.joyMap.getState('rightAnalogX'),
            y: this.joyMap.getState('rightAnalogY')
        };

        this.player.x += leftAnalog.x.value * 2;
        this.player.y += leftAnalog.y.value * 2;


        this.player.angle = Math.atan2(rightAnalog.y.value, rightAnalog.x.value);


        const { ctx } = this.state;

        ctx.clearRect(0, 0, SIZE.width, SIZE.height);
        ctx.fillStyle = "rgb(200,0,0)";

        ctx.translate(this.player.x, this.player.y);
        ctx.rotate(this.player.angle);
        ctx.translate(-this.player.x, -this.player.y);

        //ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.fillRect(this.player.x - 25, this.player.y - 25, 50, 50);

        ctx.translate(this.player.x, this.player.y);
        ctx.rotate(-this.player.angle);
        ctx.translate(-this.player.x, -this.player.y);
    };

    render() {
        return (
            <div className="movement-example">
                <canvas ref="canvas" width={SIZE.width} height={SIZE.height} />
            </div>);
    }
}
