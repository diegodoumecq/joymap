import { forEach, reduce } from 'lodash/fp';

import '../main.styl';
import './Arrows.styl';

import { createJoyMap, createEventModule } from '../../src/index';

const arrows = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘', '→'];
const sticks = ['L', 'R'];
const buttons = ['dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight'];

const players = [];
const MOVES = 15;

// Populate the app div with some basic html
document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">Using events module to display sticks as arrows</h1>
        </header>
        <div class="arrows-example">
        </div>
    </article>`;

function render(history) {
    return reduce((result, value) => `${result} <div class="${value[0]}">${value}</div>`, '', history);
}

function getArrow([x, y]) {
    const radians = Math.atan2(y * -1, x);
    if (radians < 0) {
        return arrows[8 + Math.round((radians * 4) / Math.PI)];
    }
    return arrows[Math.round((radians * 4) / Math.PI)];
}

function getDigitalArrow(name) {
    switch (name) {
    case 'dpadRight': return arrows[0];
    case 'dpadUp': return arrows[2];
    case 'dpadLeft': return arrows[4];
    case 'dpadDown': return arrows[6];
    default: return 'Unknown input';
    }
}

function createPlayer(joyMap, padId) {
    const history = [];
    const module = createEventModule({ padId });
    joyMap.addModule(module);

    /*
    // TODO Rethink to allow diagonals
    forEach(b => module.addButtonEvent(b, ({ pressed }) => {
        const arrow = `D${getDigitalArrow(b)}`;
        if (pressed && history[history.length - 1] !== arrow) {
            if (history.length === MOVES) {
                history.splice(0, 1);
            }
            history.push(arrow);
        }
    }), buttons);
    */

    // TODO Fix flooding of inputs when more than 1 input at a time is used

    forEach(s => module.addStickEvent(s, ({ pressed, value }) => {
        const arrow = s + getArrow(value);
        if (pressed && history[history.length - 1] !== arrow) {
            if (history.length === MOVES) {
                history.splice(0, 1);
            }
            history.push(arrow);
        }
    }), sticks);

    const element = document.createElement('section');
    element.className = 'module';
    element.innerHTML = `
        <div class="name">Gamepad: ${padId}</div>
        <div class="arrows" id="${padId}">Waiting for inputs...</div>
    `;

    document.querySelector('.arrows-example').appendChild(element);

    return {
        id: padId,
        history
    };
}

// Initial joyMap setup
const joyMap = createJoyMap({
    onPoll() {
        const unusedIds = joyMap.getUnusedPadIds();

        if (unusedIds.length > 0) {
            forEach(padId => players.push(createPlayer(joyMap, padId)), unusedIds);
        }

        forEach(player => {
            // Re-render this last output into HTML
            document.getElementById(player.id).innerHTML = render(player.history);
        }, players);
    }
});

joyMap.start();
