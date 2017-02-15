/* @flow */
export type IButtonIndex = number; // a number that goes from 0 to N where N is the number of buttons
export type IButtonIndexes = IButtonIndex[];
export type IButtonState = {
    value: number, // a number that goes from 0 to 1
    pressed: boolean,
    justChanged: boolean
};
export type IButtonStates = { [index: string]: IButtonState };
export type IButtonMap = IButtonIndexes;
export type IButtonMaps = { [key: string]: IButtonMap };

export type IStickValue = number[]; // numbers that go from -1 to 1
export type IStickIndex = number[]; // numbers that go from 0 to N where N is the number of sticks
export type IStickIndexes = IStickIndex[];
export type IStickInverts = boolean[];
export type IStickState = {
    value: IStickValue,
    pressed: boolean,
    justChanged: boolean,
    inverts: IStickInverts
};
export type IStickStates = { [index: string]: IStickState };
export type IStickMap = {
    indexes: IStickIndexes,
    inverts: IStickInverts
};
export type IStickMaps = { [key: string]: IStickMap };

export type IMapperValue = any;
export type IMapperValues = { [index: string]: IMapperValue };
export type IMapper = () => IMapperValue;
export type IMappers = { [key: string]: IMapper };

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

    buttonMap: (pad: IParsedGamepad, prevPad: IParsedGamepad, indexes: IButtonIndexes) => IButtonState,
    stickMap: (
        pad: IParsedGamepad,
        prevPad: IParsedGamepad,
        indexMaps: IStickIndexes,
        inverts: IStickInverts,
        threshold: number
    ) => IStickState,

    buttons: IButtonMaps,
    sticks: IStickMaps,
    mappers: IMappers
};

export type IPlayer = {
    getPadId: () => ?string,
    isConnected: () => boolean,
    disconnect: () => void,
    connect: (padId?: string) => void,
    getConfig: () => string,
    setConfig: (serializedString: string) => void,

    getButtons: (...names: string[]) => IButtonState | IButtonStates,
    getSticks: (...names: string[]) => IStickState | IStickStates,
    getMappers: (...names: string[]) => IMapperValue | IMapperValues,

    getButtonIndexes: (...inputNames: string[]) => IButtonIndexes,
    getStickIndexes: (...inputNames: string[]) => IStickIndexes,

    setButton: (inputName: string, indexes: IButtonIndex | IButtonIndexes) => void,
    setStick: (inputName: string, indexes: any[], inverts?: IStickInverts) => void,
    setMapper: (mapperName: string, callback: IMapper) => void,

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
