import createBaseModule, { BaseModule } from './baseModule/base';
import createQueryModule, { QueryModule } from './queryModule/query';
import createEventModule, { EventModule } from './eventModule/event';
import createStreamModule, { StreamModule } from './streamModule/stream';
import createJoyMap, { JoyMap } from './JoyMap';
declare const _default: {
    createBaseModule: typeof createBaseModule;
    createQueryModule: typeof createQueryModule;
    createEventModule: typeof createEventModule;
    createStreamModule: typeof createStreamModule;
    createJoyMap: typeof createJoyMap;
};
export default _default;
export { createBaseModule };
export { createQueryModule };
export { createEventModule };
export { createStreamModule };
export { createJoyMap };
export { BaseModule };
export { QueryModule };
export { EventModule };
export { StreamModule };
export { JoyMap };
