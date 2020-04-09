import { forEach, reduce, compact, flow, concat, takeRight, filter } from 'lodash/fp';

import '../main.styl';
import './Fighting.styl';

import { createJoyMap, createQueryModule, QueryModule, JoyMap } from '../../src/index';

interface Player {
  id: string;
  module: QueryModule;
  history: string[];
}

const arrows = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘', '→'];
const dpadButtons = ['dpadUp', 'dpadDown', 'dpadLeft', 'dpadRight'];
const buttons = ['L3', 'L2', 'L1', 'R3', 'R2', 'R1', 'A', 'B', 'X', 'Y'];

const players: Player[] = [];
const MAX_MOVES = 15;

// Populate the app div with some basic html
const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <article class="examples-container">
    <header>
      <h1 className="title">Display gamepad input like a fighting game's training mode</h1>
      <h2>(Using the query module)</h2>
    </header>
    <div class="fighting-example"></div>
  </article>
`;

function getArrow([x, y]: number[]) {
  const radians = Math.atan2(y * -1, x);
  if (radians < 0) {
    return arrows[8 + Math.round((radians * 4) / Math.PI)];
  }
  return arrows[Math.round((radians * 4) / Math.PI)];
}

// Utility function to avoid double ternary (?) operator
function getAxis(negative: boolean, positive: boolean) {
  if (negative) {
    return -1;
  }
  if (positive) {
    return 1;
  }
  return 0;
}

function createDpadMapper(module: QueryModule) {
  let prevArrow: string | null = null;
  module.setMapper('dpad', ({ getButtons }) => {
    const d = getButtons(...dpadButtons);
    const x = getAxis(d.dpadLeft.pressed, d.dpadRight.pressed);
    const y = getAxis(d.dpadUp.pressed, d.dpadDown.pressed);

    if (x !== 0 || y !== 0) {
      const arrow = getArrow([x, y]);

      if (prevArrow === arrow) {
        return false;
      }

      prevArrow = arrow;
      return `D${arrow}`;
    }

    prevArrow = null;
    return false;
  });
}

function createStickMapper(module: QueryModule, stickName: string) {
  let prevArrow: string | null = null;
  module.setMapper(stickName, (m) => {
    const { pressed, value } = m.getStick(stickName);
    if (pressed) {
      const arrow = getArrow(value);

      if (prevArrow === arrow) {
        return false;
      }

      prevArrow = arrow;
      return stickName + arrow;
    }

    prevArrow = null;
    return false;
  });
}

function createPlayer(joyMap: JoyMap, padId: string) {
  const history: string[] = [];
  const module: QueryModule = createQueryModule({ padId });
  joyMap.addModule(module);

  createStickMapper(module, 'L');
  createStickMapper(module, 'R');
  createDpadMapper(module);

  const element = document.createElement('section');
  element.className = 'module';
  element.innerHTML = `
        <div class="name">Gamepad: ${padId}</div>
        <div class="inputs" id="${padId}">Waiting for inputs...</div>`;

  const mainElement = document.querySelector('.fighting-example') as HTMLElement;
  mainElement.appendChild(element);

  return {
    id: padId,
    module,
    history,
  };
}

// Initial joyMap setup
const joyMap = createJoyMap({
  onPoll() {
    const unusedIds = joyMap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      forEach((padId) => players.push(createPlayer(joyMap, padId)), unusedIds);
    }

    forEach((player) => {
      const buttonStates = player.module.getButtons(...buttons);
      const mapperStates = player.module.getAllMappers();
      player.history = flow(
        Object.keys,
        filter((name) => buttonStates[name].pressed && buttonStates[name].justChanged),
        concat(compact(Object.values(mapperStates))),
        concat(player.history),
        takeRight(MAX_MOVES),
      )(buttonStates);

      const newRender = reduce(
        (result, value) => {
          const className = value.replace(/[^\x00-\x7F]/g, '');
          return `${result} <div class="${className}">${value}</div>`;
        },
        '',
        player.history,
      );

      const el = document.getElementById(player.id) as HTMLElement;
      if (el.innerHTML !== newRender) {
        el.innerHTML = newRender;
      }
    }, players);
  },
});

joyMap.start();
