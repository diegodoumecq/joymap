import { split, reduce, filter, flow, map, isString } from 'lodash/fp';

import { nameIsValid } from '../common/utils';
import shuntingYard, { operators } from './shuntingYard';
import { EventToken } from '../types';

/**
 * Returns EventToken[] in reverse polish notation (RPN)
 */
export function getEventTokens(name: string) {
  return flow(
    split(/([^a-zA-Z0-9.&&||])/g),
    filter((value) => !!value && value !== ' '),
    shuntingYard,
    map((value) => {
      if (operators.includes(value)) {
        return value;
      }

      return {
        inputName: split('.', value)[0],
        inputState: split('.', value)[1] || 'pressed',
      };
    }),
  )(name) as EventToken[];
}

export function eventIsValid(inputs: EventToken[]) {
  const eventTokens = Array.isArray(inputs) ? inputs : getEventTokens(inputs);

  return reduce(
    (result, token) => {
      if (!result) {
        return result;
      }

      if (isString(token)) {
        return operators.includes(token);
      }

      return nameIsValid(token.inputName);
    },
    true,
    eventTokens,
  );
}

export function verifyTokens(arr: (string | boolean)[]) {
  const stack: boolean[] = [];

  arr.forEach((token) => {
    if (typeof token === 'boolean') {
      stack.push(token);
    } else {
      const elem1 = stack.pop();
      const elem2 = stack.pop();

      if (token === '&&') {
        stack.push(!!(elem1 && elem2));
      } else if (token === '||') {
        stack.push(!!(elem1 || elem2));
      } else {
        throw new Error(`verifyTokens: invalid operator ${token} was used`);
      }
    }
  });

  return stack[0];
}
