import { EventToken } from '../types';
/**
  * Returns EventToken[] in reverse polish notation (RPN)
  */
export declare function getEventTokens(name: string): EventToken[];
export declare function eventIsValid(inputs: EventToken[]): boolean;
export declare function verifyTokens(arr: (string | boolean)[]): boolean;
