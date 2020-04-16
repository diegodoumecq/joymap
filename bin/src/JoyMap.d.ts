import { BaseModule } from './baseModule/base';
import { QueryModule } from './queryModule/query';
import { StreamModule } from './streamModule/stream';
import { EventModule } from './eventModule/event';
import { RawGamepad } from 'baseModule/baseUtils';
export interface Params {
    onPoll?: () => void;
    autoConnect?: boolean;
}
export interface State {
    onPoll: () => void;
    autoConnect: boolean;
    gamepads: RawGamepad[];
    modules: AnyModule[];
}
export declare type AnyModule = BaseModule['module'] | QueryModule | StreamModule | EventModule;
export declare type JoyMap = ReturnType<typeof createJoyMap>;
export default function createJoyMap(params?: Params): {
    isSupported: () => boolean;
    start: () => void;
    stop: () => void;
    setOnPoll: (onPoll: () => void) => void;
    setAutoConnect: (autoConnect: boolean) => void;
    getGamepads: () => RawGamepad[];
    getModules: () => AnyModule[];
    getUnusedPadIds: () => string[];
    getUnusedPadId: () => string | undefined;
    addModule: (module: AnyModule) => void;
    removeModule: (module: AnyModule) => void;
    clearModules: () => void;
    poll: () => void;
};
