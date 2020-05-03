import { createJoymap, createQueryModule, Joymap, QueryModule } from '../../src/index';
import { join, compact, forEach } from 'lodash/fp';
import { stringifyInputs, countPressed, renderRows, stringifyMappers } from './utils';
import setupRotatingLogo from '../rotatingLogo';

import './Log.styl';

// Populate the app div with some basic html
const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <div class="main-container">
    <header>
      <h3>Let's log all gamepad inputs</h3>
    </header>
    <div class="log-example">
      <div class="log">
      </div>
      <div class="unplugged">
        <canvas id="unplugged-canvas" width="300" height="300"></canvas>
        <h3>Waiting for gamepad/s to be connected</h3>
      </div>
    </div>
  </div>
`;

const unpluggedCanvas = document.getElementById('unplugged-canvas');
setupRotatingLogo(unpluggedCanvas);

function log(info: string) {
  const logElement = document.querySelector('.log') as HTMLElement;
  const first = logElement.firstChild as HTMLElement;

  if (first && first.children && first.children[1].innerHTML === info) {
    const count = parseInt(first.children[0].innerHTML, 10);
    first.children[0].innerHTML = `${count + 1} frames`;
  } else {
    const element = document.createElement('div');
    element.className = 'log-line';
    element.innerHTML = `<span class="log-count">1 frame</span><span>${info}</span>`;

    logElement.insertBefore(element, logElement.firstChild);
    if (logElement.children.length > 20 && logElement.lastChild) {
      logElement.removeChild(logElement.lastChild);
    }
  }
}

function setupModule(joymap: Joymap, padId: string) {
  const m = createQueryModule({ padId });
  joymap.addModule(m);

  // Set custom buttons
  m.setButton('Jump', m.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));
  m.setButton('Shoot', m.getButtonIndexes('B'));
  m.setButton('LookUp', m.getButtonIndexes('dpadUp'));
  m.setButton('LookDown', m.getButtonIndexes('dpadDown'));
  m.setButton('LookLeft', m.getButtonIndexes('dpadLeft'));
  m.setButton('LookRight', m.getButtonIndexes('dpadRight'));
  m.setButton('StickAverage', m.getStickIndexes('L', 'R'));

  // Set mappers
  m.setMapper('Move', (module) => module.getStick('L').pressed);
  m.setMapper('Point', (module) => module.getStick('R').pressed);
  m.setMapper('MoveANDPoint', (module) => countPressed(module.getSticks('R', 'L')) === 2);
  m.setMapper('MoveXORPoint', (module) => !!(module.getMapper('Move') ^ module.getMapper('Point')));
  m.setMapper('CountFace', (module) => countPressed(module.getButtons('A', 'B', 'X', 'Y')));
  m.setMapper('CountAll', (module) => {
    const buttonCount = countPressed(module.getAllButtons());
    const stickCount = countPressed(module.getAllSticks());

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
  const mainElement = document.querySelector('.log-example') as HTMLElement;
  mainElement.insertBefore(element, mainElement.firstChild);

  const unplugged = document.querySelector('.unplugged');
  if (unplugged) {
    mainElement.removeChild(unplugged);
  }
}

// Flags used to show/hide output separated by input type
const showButtons = true;
const showSticks = true;
const showMappers = true;

// Initial joymap setup
const joymap = createJoymap({
  onPoll() {
    const unusedIds = joymap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      forEach((padId) => setupModule(joymap, padId), unusedIds);
    }

    forEach((module) => {
      const compilation = [
        !showButtons ? '' : stringifyInputs(module.getAllButtons()),
        !showSticks ? '' : stringifyInputs(module.getAllSticks()),
        !showMappers ? '' : stringifyMappers(module.getAllMappers()),
      ];

      const stringOutput = join(', ', compact(compilation));

      if (stringOutput) {
        log(stringOutput);

        const padElement = document.getElementById(module.getPadId() || '') as HTMLElement;
        padElement.innerHTML = renderRows(
          compact([
            !showButtons
              ? null
              : {
                  inputType: 'buttons',
                  compilation: compilation[0],
                  displayName: 'Buttons',
                },
            !showSticks
              ? null
              : {
                  inputType: 'sticks',
                  compilation: compilation[1],
                  displayName: 'Sticks',
                },
            !showMappers
              ? null
              : {
                  inputType: 'mappers',
                  compilation: compilation[2],
                  displayName: 'Mappers',
                },
          ]),
        );
      }
    }, joymap.getModules() as QueryModule[]);
  },
});

joymap.start();
