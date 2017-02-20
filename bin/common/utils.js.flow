/* @flow */
import type {
    IStickState, IStickIndexes,
    IStickValue, IStickInverts,
    IButtonState, IButtonIndexes,
    IGamepad
} from './types';

// These are generic Lodash function replacements

export function noop() {}

export function arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) {
        return true;
    }

    const length = a.length;
    if (length !== b.length) {
        return false;
    }

    let i = 0;
    while (i < length) {
        if (a[i] !== b[i]) {
            return false;
        }
        i += 1;
    }
    return true;
}

export function map(attr: string = '', target: Object[] | Object): any[] {
    if (Array.isArray(target)) {
        return target.map(value => value[attr]);
    }

    const indexes = Object.keys(target);
    const length = indexes.length;
    const result = [];
    let i = 0;
    while (i < length) {
        const index = indexes[i];
        result.push(target[index][attr]);
        i += 1;
    }

    return result;
}

export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function includes<T>(search: T, list: T[] = []): boolean {
    return list.indexOf(search) !== -1;
}

export function difference<T>(source: T[], removal: T[]): T[] {
    const length = source.length;
    const result = [];
    let i = 0;

    while (i < length) {
        if (!includes(source[i], removal)) {
            result.push(source[i]);
        }
        i += 1;
    }

    return result;
}

export function omit(indexes: string[], target: Object): Object {
    const length = indexes.length;
    const result = Object.assign({}, target);
    let i = 0;

    while (i < length) {
        delete result[indexes[i]];
        i += 1;
    }

    return result;
}

export function unique<T>(target: T[]): T[] {
    const length = target.length;

    if (length <= 1) {
        return target;
    }

    const result = [];
    let i = 0;
    while (i < length) {
        if (!result.includes(target[i])) {
            result.push(target[i]);
        }
        i += 1;
    }

    return result;
}

export function isConsecutive(target: number[]): boolean {
    const length = target.length;

    if (length <= 1) {
        return true;
    }

    let i = 0;
    while (i < length - 1) {
        if (target[i] + 1 !== target[i + 1]) {
            return false;
        }
        i += 1;
    }

    return true;
}

type FindIndexesCb = (value: any, index: number) => boolean;
export function findIndexes(iterator: FindIndexesCb, target: any[]): number[] {
    const length = target.length;
    const result = [];
    let i = 0;

    while (i < length) {
        if (iterator(target[i], i)) {
            result.push(i);
        }
        i += 1;
    }

    return result;
}

type MapValuesCb = (value: any, name: string) => any;
export function mapValues(iterator: MapValuesCb, obj: Object): Object {
    const result = {};
    Object.keys(obj).forEach(name => {
        result[name] = iterator(obj[name], name);
    });
    return result;
}

export function matches(comparison: Object, source: Object) {
    const match = Object.keys(comparison).map(name => [comparison[name], name]);
    const length = match.length;
    let i = 0;

    while (i < length) {
        const [value, index] = match[i];
        if (source[index] !== value) {
            return false;
        }
        i += 1;
    }

    return true;
}

export function find(search: Object, target: Object[]): any | null {
    const length = target.length;
    let i = 0;

    while (i < length) {
        const value = target[i];
        if (matches(search, value)) {
            return value;
        }
        i += 1;
    }

    return null;
}

export function findIndex(search: Object, target: any[]): number {
    const length = target.length;
    let i = 0;

    while (i < length) {
        if (matches(search, target[i])) {
            return i;
        }
        i += 1;
    }

    return -1;
}

type FindKeyCb = (value: any, name?: string) => boolean;
export function findKey(search: FindKeyCb | Object, target: Object): string | null {
    const targetIndexes = Object.keys(target);
    const length = targetIndexes.length;
    let i = 0;
    if (typeof search === 'function') {
        while (i < length) {
            const index = targetIndexes[i];
            if (search(target[index], index)) {
                return index;
            }
            i += 1;
        }
    } else {
        while (i < length) {
            const index = targetIndexes[i];
            if (matches(search, target[index])) {
                return index;
            }
            i += 1;
        }
    }

    return null;
}


// These are domain-specific


export function getRawGamepads(): Gamepad[] {
    if (navigator && navigator.getGamepads) {
        return Array.from(navigator.getGamepads());
    }
    return [];
}

export function nameIsValid(name: string) {
    return /^[a-z0-9]+$/i.test(name);
}

export function isButtonSignificant(value: number = 0, threshold: number): boolean {
    return Math.abs(value) > threshold;
}

export function isStickSignificant(stickValue: IStickValue, threshold: number): boolean {
    return stickValue.findIndex(value => Math.abs(value) >= threshold) !== -1;
}

export function buttonMap(
    pad: IGamepad,
    prevPad: IGamepad,
    indexes: IButtonIndexes,
    threshold: number
): IButtonState {
    const length = indexes.length;

    let prevPressed = false;
    let value = 0;
    let pressed = false;

    let i = 0;
    while (i < length) {
        if (!prevPressed) {
            const prevValue = prevPad.buttons[indexes[i]] || 0;
            prevPressed = isButtonSignificant(prevValue, threshold);
        }

        const currValue = pad.buttons[indexes[i]] || 0;
        value = Math.max(value, currValue);
        if (!pressed) {
            pressed = isButtonSignificant(currValue, threshold);
        }

        i += 1;
    }

    return {
        value,
        pressed,
        justChanged: pressed !== prevPressed
    };
}

export function roundSticks(indexMaps: IStickIndexes, axes: number[], threshold: number): IStickValue {
    let count = 0;
    let counts = [];

    indexMaps.forEach(indexes => {
        const values = indexes.map(i => axes[i]);

        if (isStickSignificant(values, threshold)) {
            counts = values.map((v, i) => v + (counts[i] || 0));
            count += 1;
        }
    });

    return count === 0 ? indexMaps[0].map(() => 0) : counts.map(v => v / count);
}

export function stickMap(
    pad: IGamepad,
    prevPad: IGamepad,
    indexMaps: IStickIndexes,
    inverts: IStickInverts,
    threshold: number
): IStickState {
    const prevPressed = isStickSignificant(roundSticks(indexMaps, prevPad.axes, threshold), threshold);
    const value = roundSticks(indexMaps, pad.axes, threshold).map((v, i) => (!inverts[i] ? v : v * -1));
    const pressed = isStickSignificant(value, threshold);

    return {
        value,
        pressed,
        justChanged: pressed !== prevPressed,
        inverts
    };
}
