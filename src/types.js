/* @flow */
export type IButtonValue = number;
export type IButtonIndexes = number[];

export type IStickValue = number[];
export type IStickIndexes = Array<number[]>;
export type IStickInverts = boolean[];

export type IButtonState = {
    value: IButtonValue,
    pressed: boolean,
    justChanged: boolean
};
export type IStickState = {
    value: IStickValue,
    pressed: boolean,
    justChanged: boolean,
    inverts: IStickInverts
};

export type IButton = IButtonIndexes;
export type IStick = {
    indexes: IStickIndexes,
    inverts: IStickInverts
};
export type IMapper = {
    callback: Function,
    value: any,
    automatic: boolean
};

export type IParsedGamepad = {
    buttons: IButtonState[],
    axes: number[]
};

export type IListenParams = {
    waitFor: [number, 'polls' | 'ms'],
    consecutive: boolean,
    allowOffset: boolean
};

export type IListenOptions = {
    callback: (indexes: number[]) => void,
    quantity: number,
    type: 'buttons' | 'axes',
    currentValue: number,
    useTimeStamp: boolean,
    targetValue: number,
    consecutive: boolean,
    allowOffset: boolean
};

export type IPlayerState = {
    name: string,
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,

    sticks: { [key: string]: IStick },
    buttons: { [key: string]: IButton },
    mappers: { [key: string]: IMapper },

    gamepadId: ?string,
    connected: boolean
};
