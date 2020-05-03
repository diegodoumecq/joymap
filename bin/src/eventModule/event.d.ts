import { RawGamepad, InputResult } from '../types';
export declare type EventModule = ReturnType<typeof createEventModule>;
export default function createEventModule(params?: {}): {
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
    addRumble: (effect: number | {
        duration: number;
        weakMagnitude?: number | undefined;
        strongMagnitude?: number | undefined;
    } | import("../types").Effect[], channelName?: string | undefined) => void;
    destroy: () => void;
} & {
    addEvent: (eventName: string, callback: (button: InputResult[]) => void) => void;
    removeEvent: (eventName: string, callback: (button: InputResult[]) => void) => void;
    update: (gamepad: RawGamepad) => void;
    destroy(): void;
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
    addRumble: (effect: number | {
        duration: number;
        weakMagnitude?: number | undefined;
        strongMagnitude?: number | undefined;
    } | import("../types").Effect[], channelName?: string | undefined) => void;
};
