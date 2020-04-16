import type * as rxjs from 'rxjs';
import type * as operators from 'rxjs/operators';
import { BaseParams } from '../baseModule/base';
import { RawGamepad } from '../baseModule/baseUtils';
import { ButtonResult, StickResult } from '../common/utils';
export declare type StreamModule = ReturnType<typeof createStreamModule>;
export interface ButtonStreamMapValue {
    stream: rxjs.Subject<() => ButtonResult>;
    updateFn: () => ButtonResult;
}
export interface StickStreamMapValue {
    stream: rxjs.Subject<() => StickResult>;
    updateFn: () => StickResult;
}
export interface StreamParams extends BaseParams {
    rxjs: typeof rxjs;
    operators: typeof operators;
}
export default function createStreamModule(params: StreamParams): {
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
    update: (gamepad: RawGamepad) => void;
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
    isRumbleSupported: (rawPad?: RawGamepad | undefined) => boolean | null;
    stopRumble: (channelName?: string | undefined) => void;
    addRumble: (effect: import("../baseModule/baseUtils").Effect | (number | import("../baseModule/baseUtils").Effect)[], channelName?: string | undefined) => void;
    destroy: () => void;
} & {
    getAllButtonsStream: () => rxjs.Subject<() => Record<string, ButtonResult>>;
    getAllStickStream: () => rxjs.Subject<() => Record<string, StickResult>>;
    getButtonStream: (buttonName: string) => rxjs.Subject<() => ButtonResult>;
    getStickStream: (stickName: string) => rxjs.Subject<() => StickResult>;
    update: (gamepad: RawGamepad) => void;
    destroy: () => void;
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
    isRumbleSupported: (rawPad?: RawGamepad | undefined) => boolean | null;
    stopRumble: (channelName?: string | undefined) => void;
    addRumble: (effect: import("../baseModule/baseUtils").Effect | (number | import("../baseModule/baseUtils").Effect)[], channelName?: string | undefined) => void;
};
