import { join, compact } from 'lodash/fp';
import {
    stringifyInputs, stringifyAggregators,
    countPressed, renderRows
} from './utils';

import '../main.styl';
import './StateLog.styl';

import JoyMap from '../../src/JoyMap';

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
const showButtonAliases = true;
const showSticks = true;
const showStickAliases = true;
const showAggregators = true;

// Initial joyMap setup
const joyMap = JoyMap({
    threshold: 0.2,
    onPoll() {
        const { mainPlayer } = joyMap.players;
        // On each frame render to HTML and console.log the state of buttons, sticks, aliases and aggregators
        const compilation = [
            !showButtons ? '' : stringifyInputs(mainPlayer, 'buttons'),
            !showButtonAliases ? '' : stringifyInputs(mainPlayer, 'buttonAliases'),
            !showSticks ? '' : stringifyInputs(mainPlayer, 'sticks'),
            !showStickAliases ? '' : stringifyInputs(mainPlayer, 'stickAliases'),
            !showAggregators ? '' : stringifyAggregators(mainPlayer)
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
                !showButtonAliases ? null : {
                    inputType: 'button-aliases',
                    compilation: compilation[1],
                    displayName: 'ButtonAliases'
                },
                !showSticks ? null : {
                    inputType: 'sticks',
                    compilation: compilation[2],
                    displayName: 'Sticks'
                },
                !showStickAliases ? null : {
                    inputType: 'stick-aliases',
                    compilation: compilation[3],
                    displayName: 'StickAliases'
                },
                !showAggregators ? null : {
                    inputType: 'aggregators',
                    compilation: compilation[4],
                    displayName: 'Aggregators'
                }
            ]));
        }
    }
});

const mainPlayer = joyMap.addPlayer('mainPlayer');

// Set aliases
mainPlayer.setAlias('Jump', ['A', 'X', 'Y', 'L2', 'R2']);
mainPlayer.setAlias('Shoot', 'B');
mainPlayer.setAlias('LookUp', 'dpadUp');
mainPlayer.setAlias('LookDown', 'dpadDown');
mainPlayer.setAlias('LookLeft', 'dpadLeft');
mainPlayer.setAlias('LookRight', 'dpadRight');
mainPlayer.setAlias('StickAverage', ['L', 'R']);

// Set aggregators
mainPlayer.setAggregator('Point', player => player.sticks.R.pressed);
mainPlayer.setAggregator('MovePoint', (player, previousValue, rawGamepad) => { // eslint-disable-line
    return countPressed(player.sticks);
});
mainPlayer.setAggregator('CountFace', (player, previousValue, rawGamepad) => { // eslint-disable-line
    const { A, B, X, Y } = player.buttons;
    return countPressed([A, B, X, Y]);
});
mainPlayer.setAggregator('CountAll', (player, previousValue, rawGamepad) => { // eslint-disable-line
    const buttonCount = countPressed(player.buttons);
    const buttonAliasCount = countPressed(player.buttonAliases);
    const stickCount = countPressed(player.sticks);
    const stickAliasCount = countPressed(player.stickAliases);
    const total = buttonCount + stickCount + buttonAliasCount + stickAliasCount;

    if (total > 0) {
        return `${total}(Btn:${buttonCount} Sticks:${stickCount} Aliases:${buttonAliasCount + stickAliasCount})`;
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
