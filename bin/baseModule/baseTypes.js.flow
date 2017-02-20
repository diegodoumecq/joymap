import {
    IGamepad, IButtonMaps, IStickMaps, IButtonIndexes,
    IStickIndexes, IStickInverts
} from '../common/types';

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
