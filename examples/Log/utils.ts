import { Mapper, InputResult } from '../../src/index';
import { reduce, flow, split, map, join, compact } from 'lodash/fp';

// Utility function to count the number of pressed inputs of the given collection
export function countPressed(inputs: Record<string, { pressed: boolean }>) {
  return reduce((result, { pressed }) => result + (pressed ? 1 : 0), 0, inputs);
}

// Utility function to render to HTML all inputs divided by type
export function renderRows(
  params: Array<{
    displayName: string;
    inputType: string;
    compilation: string;
  }>,
) {
  return reduce(
    (result, { displayName, inputType, compilation }) => `${result}
      <div class="row">
        <span class="input-type">${displayName}:</span>
        ${flow(
          split(', '),
          compact,
          map((value) => `<span class="${inputType}">${value}</span>`),
          join(''),
        )(compilation)}
      </div>`,
    '',
    params,
  );
}

// Utility function to print the state of all activated inputs of a type
export function stringifyInputs(inputs: Record<string, InputResult>) {
  return reduce(
    (result, inputName) => {
      const input = inputs[inputName];

      if (input.pressed || input.justChanged) {
        if (input.type === 'button') {
          return `${result} ${inputName}: ${input.pressed ? 'pressed' : 'released'}(${
            Math.round(input.value * 100) / 100
          }),`;
        }

        const [x, y] = input.value;
        return `${result} ${inputName}: ${input.pressed ? 'pressed' : 'released'}(x: ${
          Math.round(x * 100) / 100
        }, y: ${Math.round(y * 100) / 100}),`;
      }

      return result;
    },
    '',
    Object.keys(inputs),
  ).slice(0, -1);
}

export function stringifyMappers(mappers: Record<string, Mapper>) {
  return reduce(
    (result, inputName) => {
      const mapper = mappers[inputName];

      if (mapper) {
        return `${result} ${inputName}: (${mapper}),`;
      }

      return result;
    },
    '',
    Object.keys(mappers),
  ).slice(0, -1);
}
