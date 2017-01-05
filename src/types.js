/* @flow */
export type IPoint = { x: number, y: number };

export type IStick = {
    value: IPoint,
    pressed: boolean,
    justChanged: boolean,
    invertX: boolean,
    invertY: boolean
};
export type IButton = { value: number, pressed: boolean, justChanged: boolean };

export type IParsedGamepad = {
    buttons: IButton[],
    axes: number[]
};

export type IStickAlias = { inputs: string[], value: IPoint, pressed: boolean, justChanged: boolean };
export type IButtonAlias = { inputs: string[], value: number, pressed: boolean, justChanged: boolean };

export type IAggregator = { callback: Function, value: any };

export type IStickMapper = (pad: IParsedGamepad, invertX: boolean, invertY: boolean) => IPoint;
export type IButtonMapper = (pad: IParsedGamepad) => IButton;

export type IStickBinding = { index: number, mapper: IStickMapper };
export type IButtonBinding = { index: number, mapper: IButtonMapper };
