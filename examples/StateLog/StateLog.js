import { join, compact, forEach } from 'lodash/fp';
import {
    stringifyInputs, countPressed, renderRows, stringifyMappers
} from './utils';

import '../main.styl';
import './StateLog.styl';

import createJoyMap from '../../src/JoyMap';

// Populate the app div with some basic html
document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">JoyMap Dev console example</h1>
        </header>
        <div class="log-example">
            <p>Suggestion: Open the dev console</p>
        </div>
    </article>`;

function createPlayer(joyMap, padId) {
    const p = joyMap.addPlayer(padId);

    // Set custom buttons
    p.setButton('Jump', p.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));
    p.setButton('Shoot', p.getButtonIndexes('B'));
    p.setButton('LookUp', p.getButtonIndexes('dpadUp'));
    p.setButton('LookDown', p.getButtonIndexes('dpadDown'));
    p.setButton('LookLeft', p.getButtonIndexes('dpadLeft'));
    p.setButton('LookRight', p.getButtonIndexes('dpadRight'));
    p.setButton('StickAverage', p.getStickIndexes('L', 'R'));

    // Set mappers
    p.setMapper('Point', ({ player }) => player.getSticks('R').pressed);
    p.setMapper('MovePoint', ({ player }) => countPressed(player.getSticks()));
    p.setMapper('CountFace', ({ player }) => countPressed(player.getButtons('A', 'B', 'X', 'Y')));
    p.setMapper('CountAll', ({ pad, player }) => {
        const buttonCount = countPressed(pad.buttons);
        const stickCount = countPressed(player.getSticks());

        if (buttonCount || stickCount) {
            return `Btn:${buttonCount} Sticks:${stickCount}`;
        }

        return null;
    });

    const element = document.createElement('section');
    element.className = 'player';
    const id = p.getPadId();
    element.innerHTML = `
        <div class="name">Gamepad: ${id}</div>
        <div id="${id}">Waiting for inputs...</div>
    `;

    document.querySelector('.log-example').appendChild(element);
}

// Flags used to show/hide output separated by input type
const showButtons = true;
const showSticks = true;
const showMappers = true;

// Initial joyMap setup
const joyMap = createJoyMap({
    threshold: 0.2,
    onPoll() {
        const unusedIds = joyMap.getUnusedPadIds();

        if (unusedIds.length > 0) {
            forEach(padId => createPlayer(joyMap, padId), unusedIds);
        }

        forEach(player => {
            // On each frame render to HTML and console.log the state of buttons, sticks and mappers
            const compilation = [
                !showButtons ? '' : stringifyInputs(player.getButtons()),
                !showSticks ? '' : stringifyInputs(player.getSticks()),
                !showMappers ? '' : stringifyMappers(player.getMappers())
            ];

            const stringOutput = join(', ', compact(compilation));

            if (stringOutput) {
                // Log string output to dev console
                console.log(stringOutput); // eslint-disable-line

                // Re-render this last output into HTML
                document.getElementById(player.getPadId()).innerHTML = renderRows(compact([
                    !showButtons ? null : {
                        inputType: 'buttons',
                        compilation: compilation[0],
                        displayName: 'Buttons'
                    },
                    !showSticks ? null : {
                        inputType: 'sticks',
                        compilation: compilation[1],
                        displayName: 'Sticks'
                    },
                    !showMappers ? null : {
                        inputType: 'mappers',
                        compilation: compilation[2],
                        displayName: 'Mappers'
                    }
                ]));
            }
        }, joyMap.getPlayers());
    }
});

console.log( // eslint-disable-line
    '%c Welcome to the console, we got fun and games.',
    'color: green; font-weight: bold; font-size: 1.5em;'
);
console.log( // eslint-disable-line
    '%c We got everything you want honey, as long as it\'s printing all of your gamepad\'s input',
    'color: green; font-weight: bold; font-size: 1.5em;'
);

joyMap.start();
