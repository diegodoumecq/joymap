import { IButtonState, IStickState, IModule } from '../common/types';

export type IButtonEventCb = (event: IButtonState) => void;
export type IStickEventCb = (event: IStickState) => void;

export type IEventModule = IModule & {
    addButtonEvent: (name: string, callback: IButtonEventCb) => void,
    removeButtonEvent: (name: string, callback: IButtonEventCb) => void,
    addStickEvent: (name: string, callback: IStickEventCb) => void,
    removeStickEvent: (name: string, callback: IStickEventCb) => void
};
