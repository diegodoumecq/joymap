import { RawGamepad, JoymapParams } from './types';
import { BaseModule } from './baseModule/base';
import { QueryModule } from './queryModule/query';
import { StreamModule } from './streamModule/stream';
import { EventModule } from './eventModule/event';
export declare type AnyModule = BaseModule['module'] | QueryModule | StreamModule | EventModule;
export declare type Joymap = ReturnType<typeof createJoymap>;
export default function createJoymap(params?: JoymapParams): {
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
