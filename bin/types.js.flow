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
    gamepadId: ?string,
    connected: boolean,

    name: string,
    threshold: number,
    clampThreshold: boolean,
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,

    buttons: { [key: string]: IButton },
    sticks: { [key: string]: IStick },
    mappers: { [key: string]: Function }
};

export type IPlayer = {
    isConnected: () => boolean,
    getName: () => string,
    getPadId: () => ?string,
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

export type IJoyMapState = {
    threshold: number,
    clampThreshold: boolean,
    onPoll: () => void,
    autoConnect: 'manual' | 'auto',
    isSupported: boolean,
    gamepads: Gamepad[],
    players: IPlayer[]
};

export type IJoyMap = {
    isSupported: () => boolean,
    start: () => void,
    stop: () => void,

    setThreshold: (threshold: number) => void,
    setClampThreshold: (clampThreshold: boolean) => void,
    setOnPoll: (onPoll: Function) => void,
    setAutoConnect: (autoConnect: 'auto' | 'manual') => void,

    getGamepads: () => Gamepad[],
    getPlayers: () => IPlayer[],
    getUnusedPadIds: () => string[],
    getUnusedPadId: () => string | null,

    setPlayers: (jsonString: string) => void,
    addPlayer: (name: string) => IPlayer,
    removePlayer: (player: IPlayer) => void,
    clearPlayers: () => void,
    poll: () => void
};
