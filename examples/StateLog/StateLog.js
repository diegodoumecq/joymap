import { join, compact } from 'lodash/fp';
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
            <div id="logs">
                <span class="row">Psssst, hey, connect a gamepad and use it. You'll see.</span>
            </div>
        </div>
    </article>`;

// Flags used to show/hide output separated by input type
const showButtons = true;
const showSticks = true;
const showMappers = true;

// Initial joyMap setup
const joyMap = createJoyMap({
    threshold: 0.2,
    onPoll() {
        const jo = joyMap.getPlayers()[0];
        // On each frame render to HTML and console.log the state of buttons, sticks and mappers
        const compilation = [
            !showButtons ? '' : stringifyInputs(jo.getButtons()),
            !showSticks ? '' : stringifyInputs(jo.getSticks()),
            !showMappers ? '' : stringifyMappers(jo.getMappers())
        ];

        const stringOutput = join(', ', compact(compilation));

        if (stringOutput) {
            // Log string output to dev console
            console.log(stringOutput); // eslint-disable-line

            // Re-render this last output into HTML
            document.getElementById('logs').innerHTML = renderRows(compact([
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
    }
});

const jo = joyMap.addPlayer();

// Set custom buttons
jo.setButton('Jump', jo.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));
jo.setButton('Shoot', jo.getButtonIndexes('B'));
jo.setButton('LookUp', jo.getButtonIndexes('dpadUp'));
jo.setButton('LookDown', jo.getButtonIndexes('dpadDown'));
jo.setButton('LookLeft', jo.getButtonIndexes('dpadLeft'));
jo.setButton('LookRight', jo.getButtonIndexes('dpadRight'));
jo.setButton('StickAverage', jo.getStickIndexes('L', 'R'));

// Set mappers
jo.setMapper('Point', ({ player }) => player.getSticks('R').pressed);
jo.setMapper('MovePoint', ({ player }) => countPressed(player.getSticks()));
jo.setMapper('CountFace', ({ player }) => countPressed(player.getButtons('A', 'B', 'X', 'Y')));
jo.setMapper('CountAll', ({ pad, player }) => {
    const buttonCount = countPressed(pad.buttons);
    const stickCount = countPressed(player.getSticks());

    if (buttonCount || stickCount) {
        return `Btn:${buttonCount} Sticks:${stickCount}`;
    }

    return null;
});

console.log( // eslint-disable-line
    '%c Welcome to the console, we got fun and games.',
    'color: green; font-weight: bold; font-size: 1.5em;'
);
console.log( // eslint-disable-line
    '%c We got everything you want honey, as long as it\'s printing all of your gamepad input',
    'color: green; font-weight: bold; font-size: 1.5em;'
);

joyMap.start();
