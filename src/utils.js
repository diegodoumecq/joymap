/* @flow */
import type {
    IStickAlias, IButtonAlias,
    IStickBinding, IButtonBinding
} from './types';

// Lodash function replacements

type IteratorCb = (value: any, name: string) => boolean;

export function noop() {}

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

export function find(search: Object, target: any[]): any | null {
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

export function findKey(search: IteratorCb | Object, target: Object): string | null {
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

// Joymap-specific utils
export const buttonIndexMapping = {
    dpadUp: 12,
    dpadDown: 13,
    dpadLeft: 14,
    dpadRight: 15,
    L1: 4,
    L2: 6,
    L3: 10,
    R1: 5,
    R2: 7,
    R3: 11,
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    start: 9,
    select: 8
};

const mockButtons = {
    home: {
        index: -1,
        mapper: () => 0
    }
};

export function makeButtonMapper(index: number): IButtonBinding {
    return {
        index,
        mapper: pad => pad.buttons[index]
    };
}

export const buttonsMap: { [key: string]: IButtonBinding } =
    Object.assign(mapValues(value =>
        makeButtonMapper(value), buttonIndexMapping), mockButtons);

export function addButtonAlias(alias: ?IButtonAlias, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: 0,
            pressed: false,
            justChanged: false
        };
    }

    return Object.assign({}, alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

export const stickIndexMapping = {
    L: 0,
    R: 2
};

export function makeStickMapper(index: number): IStickBinding {
    return {
        index,
        mapper: (pad, invertX = false, invertY = false) => ({
            x: !invertX ? pad.axes[index] : -1 * pad.axes[index],
            y: !invertY ? pad.axes[index + 1] : -1 * pad.axes[index + 1]
        })
    };
}
export const sticksMap: { [key: string]: IStickBinding } =
    mapValues(value => makeStickMapper(value), stickIndexMapping);

export function addStickAlias(alias: ?IStickAlias, inputs: string[]) {
    if (!alias) {
        return {
            inputs,
            value: { x: 0, y: 0 },
            pressed: false,
            justChanged: false
        };
    }

    return Object.assign({}, alias, {
        inputs: [...alias.inputs, ...inputs]
    });
}

export function getRawGamepads(): Gamepad[] {
    if (navigator && navigator.getGamepads) {
        return Array.from(navigator.getGamepads());
    }
    return [];
}
