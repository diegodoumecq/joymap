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

export type IGamepad = {
    axes: number[],
    buttons: number[]
};
