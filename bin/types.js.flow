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
    threshold: number,
    clampThreshold: boolean,
    memoize: boolean,
    pad: IParsedGamepad,
    prevPad: IParsedGamepad,

    buttonMap: (pad: IParsedGamepad, prevPad: IParsedGamepad, indexes: number[]) => IButtonState,
    stickMap: (
        pad: IParsedGamepad,
        prevPad: IParsedGamepad,
        indexMaps: IStickValue[],
        inverts: IStickInverts,
        threshold: number
    ) => IStickState,

    buttons: { [key: string]: IButton },
    sticks: { [key: string]: IStick },
    mappers: { [key: string]: Function }
};

export type IPlayer = {
    getPadId: () => ?string,
    isConnected: () => boolean,
    disconnect: () => void,
    connect: (padId?: string) => void,
    getConfig: () => string,
    setConfig: (serializedString: string) => void,

    getParsedGamepad: () => IParsedGamepad,

    getButtons: (...names: string[]) => IButtonState | { [index: string]: IButtonState },
    getSticks: (...names: string[]) => IStickState | { [index: string]: IStickState },
    getMappers: (...names: string[]) => any | { [index: string]: any},

    getButtonIndexes: (...inputNames: string[]) => IButtonIndexes,
    getStickIndexes: (...inputNames: string[]) => IStickIndexes,

    setButton: (inputName: string, indexes: number | IButtonIndexes) => void,
    setStick: (inputName: string, indexes: number[] | IStickIndexes, inverts?: IStickInverts) => void,
    setMapper: (mapperName: string, callback: Function) => void,

    invertSticks: (inverts: IStickInverts, ...inputNames: string[]) => void,
    swapButtons: (btn1: string, btn2: string) => void,
    swapSticks: (btn1: string, btn2: string, includeInverts?: boolean) => void,

    removeMapper: (mapperName: string) => void,
    clearMappers: () => void,
    update: (gamepad: Gamepad) => void,

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
    memoize: boolean,
    onPoll: () => void,
    autoConnect: boolean,
    gamepads: Gamepad[],
    players: IPlayer[]
};

export type IJoyMap = {
    isSupported: () => boolean,
    getPlayerConfigs: () => string,
    setPlayerConfigs: (jsonString: string) => void,

    start: () => void,
    stop: () => void,

    setThreshold: (threshold: number) => void,
    setClampThreshold: (clampThreshold: boolean) => void,
    setOnPoll: (onPoll: Function) => void,
    setAutoConnect: (autoConnect: boolean) => void,

    getGamepads: () => Gamepad[],
    getPlayers: () => IPlayer[],
    getUnusedPadIds: () => string[],
    getUnusedPadId: () => string | null,

    addPlayer: (padId?: ?string) => IPlayer,
    removePlayer: (player: IPlayer) => void,
    clearPlayers: () => void,
    poll: () => void
};
