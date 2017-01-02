import { join, compact } from 'lodash/fp';
import {
    stringifyInputs, stringifyAggregators,
    countPressed, renderRows
} from './utils';

import '../main.styl';
import './DevConsole.styl';

import JoyMap from '../../src/JoyMap';

// Initial joyMap setup
const joyMap = new JoyMap({ threshold: 0.2 });
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

// Populate the app div with some basic html
document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">JoyMap Dev console example</h1>
        </header>
        <div class="console-example">
            <p>(Psssst, hey, connect a gamepad and use it to see stuff)</p>
            <p>(Oh, and open the dev console to see the full log of said stuff)</p>
            <div id="logs"></div>
        </div>
    </article>`;

// Flags used to show/hide output separated by input type
const showButtons = true;
const showButtonAliases = true;
const showSticks = true;
const showStickAliases = true;
const showAggregators = true;

// On each frame render to HTML and console.log the state of buttons, sticks, aliases and aggregators
joyMap.onPoll = () => {
    const compilation = [
        !showButtons ? '' : stringifyInputs(mainPlayer, 'buttons'),
        !showButtonAliases ? '' : stringifyInputs(mainPlayer, 'buttonAliases'),
        !showSticks ? '' : stringifyInputs(mainPlayer, 'sticks'),
        !showStickAliases ? '' : stringifyInputs(mainPlayer, 'stickAliases'),
        !showAggregators ? '' : stringifyAggregators(mainPlayer)
    ];

    const stringOutput = join(', ', compact(compilation));

    if (stringOutput) {
        console.log(stringOutput); // eslint-disable-line

        document.getElementById('logs').innerHTML = renderRows({
            buttons: {
                value: compilation[0],
                show: showButtons,
                displayName: 'Buttons'
            },
            'button-aliases': {
                value: compilation[1],
                show: showButtonAliases,
                displayName: 'ButtonAliases'
            },
            sticks: {
                value: compilation[2],
                show: showSticks,
                displayName: 'Sticks'
            },
            'stick-aliases': {
                value: compilation[3],
                show: showStickAliases,
                displayName: 'StickAliases'
            },
            aggregators: {
                value: compilation[4],
                show: showAggregators,
                displayName: 'Aggregators'
            }
        });
    }
};

joyMap.start();
