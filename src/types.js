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

export type IListenParams = {
    waitFor: [number, 'polls' | 'ms'],
    consecutive: boolean,
    allowOffset: boolean
};

export type IListenOptions = {
    callback: (...indexes: number[]) => void,
    quantity: number,
    type: 'buttons' | 'axes',
    currentValue: number,
    useTimeStamp: boolean,
    targetValue: number,
    consecutive: boolean,
    allowOffset: boolean
};

export type IButtonBindings = { [key: string]: IButtonBinding };
export type IStickBindings = { [key: string]: IStickBinding };

export type IPlayerState = {
    name: string,
    parsedGamepad: IParsedGamepad,

    sticks: { [key: string]: IStick },
    buttons: { [key: string]: IButton },
    buttonBindings: IButtonBindings,
    stickBindings: IStickBindings,

    gamepadId: ?string,
    connected: boolean,
    buttonAliases: { [key: string]: IButtonAlias },
    stickAliases: { [key: string]: IStickAlias },
    aggregators: { [key: string]: IAggregator }
};
