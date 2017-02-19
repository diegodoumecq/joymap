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

export type IGamepad = {
    axes: number[],
    buttons: number[]
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

export type IModuleParams = {
    threshold?: number,
    clampThreshold?: boolean,
    padId?: ?string
};

export type IModuleState = {
    threshold: number,
    clampThreshold: boolean,
    pad: IGamepad,
    prevPad: IGamepad,

    buttons: IButtonMaps,
    sticks: IStickMaps
};

export type IModule = {
    getPadId: () => ?string,
    isConnected: () => boolean,
    disconnect: () => void,
    connect: (padId?: string) => void,
    getConfig: () => string,
    setConfig: (serializedString: string) => void,

    getButtonIndexes: (...inputNames: string[]) => IButtonIndexes,
    getStickIndexes: (...inputNames: string[]) => IStickIndexes,

    setButton: (inputName: string, indexes: IButtonIndex | IButtonIndexes) => void,
    setStick: (inputName: string, indexes: any[], inverts?: IStickInverts) => void,

    invertSticks: (inverts: IStickInverts, ...inputNames: string[]) => void,
    swapButtons: (btn1: string, btn2: string) => void,
    swapSticks: (btn1: string, btn2: string, includeInverts?: boolean) => void,

    update: (gamepad: Gamepad) => void,

    cancelListen: () => void,
    listenButton: (callback: Function, quantity?: number, params?: IListenParams) => void,
    listenAxis: (callback: Function, quantity?: number, params?: IListenParams) => void,
    buttonBindOnPress: (inputName: string, callback: Function, allowDuplication?: boolean) => void,
    stickBindOnPress: (inputName: string, callback: Function, allowDuplication?: boolean) => void,

    destroy: () => void
};

export type IQueryModule = IModule & {
    getButtons: (...names: string[]) => IButtonState | IButtonStates,
    getSticks: (...names: string[]) => IStickState | IStickStates,
    getMappers: (...names: string[]) => IMapperValue | IMapperValues,

    removeMapper: (mapperName: string) => void,
    clearMappers: () => void,
    setMapper: (mapperName: string, callback: IMapper) => void
};

export type IButtonEventCb = (event: IButtonState) => void;
export type IStickEventCb = (event: IStickState) => void;

export type IEventModule = IModule & {
    addButtonEvent: (name: string, callback: IButtonEventCb) => void,
    removeButtonEvent: (name: string, callback: IButtonEventCb) => void,
    addStickEvent: (name: string, callback: IStickEventCb) => void,
    removeStickEvent: (name: string, callback: IStickEventCb) => void
};
