import { StickResult, ButtonResult } from '../types';
export interface QueryModule extends ReturnType<typeof createQueryModule> {
}
export declare type MapperResult = any;
export declare type Mapper = (module: QueryModule) => MapperResult;
export declare const emptyMapper: MapperResult;
export declare const emptyStick: StickResult;
export declare const emptyButton: ButtonResult;
export default function createQueryModule(params?: {}): {
    getPadId: () => string | null;
    isConnected: () => boolean;
    disconnect: () => void;
    connect: (padId?: string | undefined) => void;
    getConfig: () => string;
    setConfig: (serializedString: string) => any;
    getButtonIndexes: (...inputNames: string[]) => number[];
    getStickIndexes: (...inputNames: string[]) => any[];
    setButton: (inputName: string, indexes: number[]) => void;
    setStick: (inputName: string, indexes: number[][], inverts?: boolean[] | undefined) => void;
    invertSticks: (inverts: boolean[], ...inputNames: string[]) => void;
    swapButtons: (btn1: string, btn2: string) => void;
    swapSticks: (stick1: string, stick2: string, includeInverts?: boolean) => void;
    update: (gamepad: import("../types").RawGamepad) => void;
    cancelListen: () => void;
    listenButton: (callback: (indexes: number[]) => void, quantity?: number, { waitFor, consecutive, allowOffset, }?: {
        waitFor?: [number, "polls" | "ms"] | undefined;
        consecutive?: boolean | undefined;
        allowOffset?: boolean | undefined;
    }) => void;
    listenAxis: (callback: (indexes: number[][]) => void, quantity?: number, { waitFor, consecutive, allowOffset, }?: {
        waitFor?: [number, "polls" | "ms"] | undefined;
        consecutive?: boolean | undefined;
        allowOffset?: boolean | undefined;
    }) => void;
    buttonBindOnPress: (inputName: string, callback: (buttonName?: string | undefined) => void, allowDuplication?: boolean) => void;
    stickBindOnPress: (inputName: string, callback: (stickName?: string | undefined) => void, allowDuplication?: boolean) => void;
    isRumbleSupported: (rawPad?: import("../types").RawGamepad | undefined) => boolean | null;
    stopRumble: (channelName?: string | undefined) => void;
    addRumble: (effect: number | {
        duration: number;
        weakMagnitude?: number | undefined;
        strongMagnitude?: number | undefined;
    } | import("../types").Effect[], channelName?: string | undefined) => void;
    destroy: () => void;
} & {
    getButton: (inputName: string) => ButtonResult;
    getButtons: (...inputNames: string[]) => Record<string, ButtonResult>;
    getAllButtons: () => Record<string, ButtonResult>;
    getStick: (inputName: string) => StickResult;
    getSticks: (...inputNames: string[]) => Record<string, StickResult>;
    getAllSticks: () => Record<string, StickResult>;
    getMapper: (mapperName: string) => any;
    getMappers: (...mapperNames: string[]) => Record<string, any>;
    getAllMappers: () => Record<string, any>;
    setMapper: (mapperName: string, mapper: Mapper) => void;
    removeMapper: (mapperName: string) => void;
    clearMappers: () => void;
    destroy: () => void;
};
