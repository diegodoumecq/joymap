import { RawGamepad, Effect, StrictEffect } from './baseUtils';
export declare const MAX_DURATION = 5000;
export declare function makeEffectStrict(effect: Effect | number): StrictEffect;
export declare function applyRumble(pad: RawGamepad, effect: StrictEffect): Promise<string>;
export declare function stopRumble(padId: string, channelName?: string): void;
export declare function addRumble(padId: string, effect: Effect | (Effect | number)[], channelName?: string): void;
export declare function getCurrentEffect(padId: string): StrictEffect;
export declare function updateChannels(padId: string, timeElapsed: number): void;
