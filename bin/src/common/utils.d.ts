import { CustomGamepad, RawGamepad } from '../baseModule/baseUtils';
export declare type Button = number[];
export declare type Stick = {
    indexes: number[][];
    inverts: boolean[];
};
export interface ButtonResult {
    value: number;
    pressed: boolean;
    justChanged: boolean;
}
export interface StickResult {
    value: number[];
    pressed: boolean;
    justChanged: boolean;
    inverts: boolean[];
}
export declare type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;
export declare type ExpendRecursively<T> = T extends object ? T extends infer O ? {
    [K in keyof O]: ExpendRecursively<O[K]>;
} : never : T;
export declare function isConsecutive(target: number[]): boolean;
export declare function findIndexes(iterator: (a: number) => boolean, target: number[]): number[];
export declare function getRawGamepads(): (RawGamepad | null)[];
export declare function gamepadIsValid(rawGamepad: RawGamepad | null): boolean;
export declare function nameIsValid(name: string): boolean;
export declare function isButtonSignificant(value: number | undefined, threshold: number): boolean;
export declare function isStickSignificant(stickValue: number[], threshold: number): boolean;
export declare function buttonMap(pad: CustomGamepad, prevPad: CustomGamepad, indexes: number[], threshold: number, clampThreshold: boolean): ButtonResult;
export declare function roundSticks(indexMaps: number[][], axes: number[], threshold: number): number[];
export declare function stickMap(pad: CustomGamepad, prevPad: CustomGamepad, indexMaps: number[][], inverts: boolean[], threshold: number, clampThreshold: boolean): StickResult;
