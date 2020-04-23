import { EventToken } from '../types';
export declare const operators: string[];
export declare function getEventTokens(name: string): EventToken[];
export declare function eventIsValid(inputs: string | EventToken[]): boolean;
export declare function verifyTokens(arr: (string | boolean)[]): string | boolean;
