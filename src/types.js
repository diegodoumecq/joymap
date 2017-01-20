/* @flow */
export type IButtonValue = number;
export type IButtonIndexes = number[];

export type IStickValue = number[];
// #FlowExpectError Array of array of numbers IS a valid type ... no idea why it fails spectacularly
export type IStickIndexes = number[][];
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
export type IMapperOnPoll = {
    callback: Function,
    value: any
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
    mappers: { [key: string]: Function },

    gamepadId: ?string,
    connected: boolean
};

export type IPlayer = {
    isConnected: () => boolean,
    getName: () => string,
    getGamepadId: () => ?string,
    getParsedGamepad: () => IParsedGamepad,

    removeMapper: (mapperName: string) => void,
    clearMappers: () => void,
    update: (gamepad: Gamepad) => void,

    getButtons: (...names: string[]) => IButtonState | { [index: string]: IButtonState },
    getSticks: (...names: string[]) => IStickState | { [index: string]: IStickState },
    getMappers: (...names: string[]) => { [index: string]: any} | any,

    getButtonIndexes: (...inputNames: string[]) => IButtonIndexes,
    getStickIndexes: (...inputNames: string[]) => IStickIndexes,

    setButton: (inputName: string, indexes: number | IButtonIndexes) => void,
    setStick: (inputName: string, indexes: number[] | IStickIndexes, inverts?: IStickInverts) => void,
    setMapper: (mapperName: string, callback: Function) => void,

    invertSticks: (inverts: IStickInverts, ...inputNames: string[]) => void,
    swapButtons: (btn1: string, btn2: string) => void,
    swapSticks: (btn1: string, btn2: string, includeInverts?: boolean) => void,

    disconnect: () => void,
    reconnect: () => void,
    connect: (gamepadId: string) => void,

    cancelListen: () => void,
    listenButton: (callback: Function, quantity?: number, params?: IListenParams) => void,
    listenAxis: (callback: Function, quantity?: number, params?: IListenParams) => void,
    buttonBindOnPress: (inputName: string, callback: Function, allowDuplication?: boolean) => void,
    stickBindOnPress: (inputName: string, callback: Function, allowDuplication?: boolean) => void,

    destroy: () => void
};

export type IJoyMap = {
    isSupported: () => boolean,
    getGamepads: () => Gamepad[],
    getPlayers: () => IPlayer[],
    start: () => void,
    stop: () => void,
    getUnusedGamepadIds: () => string[],
    setPlayers: (jsonString: string) => void,
    addPlayer: (name: string) => IPlayer,
    removePlayer: (player: IPlayer) => void,
    cleanPlayers: () => void,
    poll: () => void
};
