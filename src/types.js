/* @flow */
export type IPoint = { x: number, y: number };
export type IStickValue = number[];
export type IButtonValue = number;

export type IStick = {
    value: IStickValue,
    pressed: boolean,
    justChanged: boolean,
    inverts: boolean[]
};
export type IButton = { value: IButtonValue, pressed: boolean, justChanged: boolean };

export type IParsedGamepad = {
    buttons: IButton[],
    axes: number[]
};

export type IStickAlias = { inputs: string[], value: IStickValue, pressed: boolean, justChanged: boolean };
export type IButtonAlias = { inputs: string[], value: IButtonValue, pressed: boolean, justChanged: boolean };

export type IAggregator = { callback: Function, value: any };

export type IStickMapper = (
    pad: IParsedGamepad,
    inverts: boolean[]
) => IStickValue;
export type IButtonMapper = (pad: IParsedGamepad) => IButton;

export type IStickBinding = {
    indexes: number[],
    mapper: IStickMapper
};
export type IButtonBinding = {
    index: number,
    mapper: IButtonMapper
};
