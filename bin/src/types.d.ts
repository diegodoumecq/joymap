export declare type Button = number[];
export declare type Stick = {
    indexes: number[][];
    inverts: boolean[];
};
export interface ButtonResult {
    value: number;
    pressed: boolean;
    justChanged: boolean;
}
export interface StickResult {
    value: number[];
    pressed: boolean;
    justChanged: boolean;
    inverts: boolean[];
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
export interface JoymapParams {
    onPoll?: () => void;
    autoConnect?: boolean;
}
export interface BaseParams {
    padId?: string;
    threshold?: number;
    clampThreshold?: boolean;
}
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
export interface EventToken {
    value: string;
    prop: 'justChanged' | 'pressed';
}
export interface ButtonEvent {
    name: string;
    callback: (button: ButtonResult | true) => void;
    tokens: EventToken[];
}
export interface StickEvent {
    name: string;
    callback: (stick: StickResult) => void;
}
