import createBaseModule, { BaseModule } from './baseModule/base';
import createQueryModule, { QueryModule, MapperResult, Mapper } from './queryModule/query';
import createEventModule, { EventModule } from './eventModule/event';
import createStreamModule, { StreamModule, StreamParams } from './streamModule/stream';
import createJoymap, { Joymap, AnyModule } from './Joymap';
export * from './types';
export { createBaseModule, createQueryModule, createEventModule, createStreamModule, createJoymap, BaseModule, QueryModule, Mapper, MapperResult, EventModule, StreamModule, StreamParams, AnyModule, Joymap, };
declare const _default: {
    createBaseModule: typeof createBaseModule;
    createQueryModule: typeof createQueryModule;
    createEventModule: typeof createEventModule;
    createStreamModule: typeof createStreamModule;
    createJoymap: typeof createJoymap;
};
export default _default;
