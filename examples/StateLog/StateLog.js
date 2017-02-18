import { join, compact, forEach } from 'lodash/fp';
import {
    stringifyInputs, countPressed, renderRows, stringifyMappers
} from './utils';

import '../main.styl';
import './StateLog.styl';

import createJoyMap, { createQueryModule } from '../../src/index';

// Populate the app div with some basic html
document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">JoyMap input logging example</h1>
        </header>
        <div class="log-example">
            <p>The dev console is also used to store all the logged input</p>
        </div>
    </article>`;

function setupModule(joyMap, padId) {
    const m = createQueryModule({ padId });
    joyMap.addModule(m);

    // Set custom buttons
    m.setButton('Jump', m.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));
    m.setButton('Shoot', m.getButtonIndexes('B'));
    m.setButton('LookUp', m.getButtonIndexes('dpadUp'));
    m.setButton('LookDown', m.getButtonIndexes('dpadDown'));
    m.setButton('LookLeft', m.getButtonIndexes('dpadLeft'));
    m.setButton('LookRight', m.getButtonIndexes('dpadRight'));
    m.setButton('StickAverage', m.getStickIndexes('L', 'R'));

    // Set mappers
    m.setMapper('Move', module => module.getSticks('L').pressed);
    m.setMapper('Point', module => module.getSticks('R').pressed);
    m.setMapper('MovePoint', module => countPressed(module.getSticks('R', 'L')) === 2);
    m.setMapper('CountFace', module => countPressed(module.getButtons('A', 'B', 'X', 'Y')));
    m.setMapper('CountAll', module => {
        const buttonCount = countPressed(module.getButtons());
        const stickCount = countPressed(module.getSticks());

        if (buttonCount || stickCount) {
            return `Btn:${buttonCount} Sticks:${stickCount}`;
        }

        return null;
    });

    const element = document.createElement('section');
    element.className = 'module';
    const id = m.getPadId();
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
            forEach(padId => setupModule(joyMap, padId), unusedIds);
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
        }, joyMap.getModules());
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
