import { CustomGamepad, ListenOptions, Button, Stick } from '../types';
export declare const mockGamepad: CustomGamepad;
export declare function updateListenOptions(listenOptions: ListenOptions, pad: CustomGamepad, threshold: number): ListenOptions | null;
export declare function getDefaultButtons(): Record<string, Button>;
export declare function getDefaultSticks(): Record<string, Stick>;
