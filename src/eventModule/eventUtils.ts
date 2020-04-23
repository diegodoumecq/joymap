import { split, reduce, includes, filter, flow, map, endsWith } from 'lodash/fp';

import { nameIsValid } from '../common/utils';
import { EventToken } from '../types';

export const operators = ['+', '!'];

export function getEventTokens(name: string) {
  return flow(
    split(/([^a-zA-Z0-9.])/g),
    filter((value) => !!value && value !== ' '),
    map((value) => ({
      value: split('.', value)[0],
      prop: endsWith('.justChanged', value) ? 'justChanged' : 'pressed',
    })),
  )(name) as EventToken[];
}

export function eventIsValid(inputs: string | EventToken[]) {
  const eventTokens = Array.isArray(inputs) ? inputs : getEventTokens(inputs);

  return reduce(
    (result, { value }) => {
      if (!result) {
        return result;
      }

      if (includes(value, operators) || nameIsValid(value)) {
        return true;
      }

      return false;
    },
    true,
    eventTokens,
  );
}

export function verifyTokens(arr: (string | boolean)[]): string | boolean {
  if (arr[0] === '!') {
    return verifyTokens([!arr[1], ...arr.slice(2)]);
  }

  if (arr.length === 1) {
    return arr[0];
  }

  if (arr[1] === '+') {
    return arr[0] && verifyTokens(arr.slice(2));
  }

  return false;
}
