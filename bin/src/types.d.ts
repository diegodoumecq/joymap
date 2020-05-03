export declare type Button = number[];
export declare type Stick = {
    indexes: number[][];
    inverts: boolean[];
};
export interface ButtonResult {
    type: 'button';
    value: number;
    pressed: boolean;
    justChanged: boolean;
}
export interface StickResult {
    type: 'stick';
    value: number[];
    pressed: boolean;
    justChanged: boolean;
    inverts: boolean[];
}
export declare type InputResult = ButtonResult | StickResult;
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
export interface InputToken {
    inputName: string;
    inputState: 'justPressed' | 'justReleased' | 'pressed' | 'released';
}
export declare type OperatorToken = string;
export declare type EventToken = InputToken | OperatorToken;
export interface InputEvent {
    name: string;
    callback: (button: InputResult[]) => void;
    tokens: EventToken[];
}
