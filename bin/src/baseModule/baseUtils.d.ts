import { Button, Stick } from '../common/utils';
export declare type Effect = number | {
    duration: number;
    weakMagnitude?: number;
    strongMagnitude?: number;
};
export interface StrictEffect {
    duration: number;
    weakMagnitude: number;
    strongMagnitude: number;
}
export interface RawGamepad extends Gamepad {
    vibrationActuator?: {
        playEffect: (type: 'dual-rumble', effect: StrictEffect) => Promise<string>;
        reset: () => Promise<string>;
    };
}
export interface CustomGamepad {
    axes: number[];
    buttons: number[];
    rawPad?: RawGamepad;
}
export interface ListenOptions {
    callback: (indexes: number[] | number[][]) => void;
    quantity: number;
    type: 'buttons' | 'axes';
    currentValue: number;
    useTimeStamp: boolean;
    targetValue: number;
    consecutive: boolean;
    allowOffset: boolean;
}
export declare const mockGamepad: CustomGamepad;
export declare function updateListenOptions(listenOptions: ListenOptions, pad: CustomGamepad, threshold: number): ListenOptions | null;
export declare function getDefaultButtons(): Record<string, Button>;
export declare function getDefaultSticks(): Record<string, Stick>;
