import { Button, Stick } from '../common/utils';
import { RawGamepad, Effect, StrictEffect, CustomGamepad } from './baseUtils';
export interface BaseParams {
    padId?: string;
    threshold?: number;
    clampThreshold?: boolean;
}
export interface State {
    threshold: number;
    clampThreshold: boolean;
    pad: CustomGamepad;
    prevPad: CustomGamepad;
    prevRumble: StrictEffect;
    lastRumbleUpdate: number;
    lastUpdate: number;
    buttons: Record<string, Button>;
    sticks: Record<string, Stick>;
}
export declare type BaseModule = ReturnType<typeof createModule>;
export default function createModule(params?: BaseParams): {
    module: {
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
        } | Effect[], channelName?: string | undefined) => void;
        destroy: () => void;
    };
    state: State;
};
