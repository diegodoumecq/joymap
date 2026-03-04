import createBaseModule, { type BaseModule } from './baseModule/base';
import createQueryModule, {
  type QueryModule,
  type MapperResult,
  type Mapper,
} from './queryModule/query';
import createEventModule, { type EventModule } from './eventModule/event';
import createStreamModule, { type StreamModule, type StreamParams } from './streamModule/stream';
import createJoymap, { type Joymap, type AnyModule } from './JoyMap';

export * from './types';

export {
  createBaseModule,
  createQueryModule,
  createEventModule,
  createStreamModule,
  createJoymap,
  BaseModule,
  QueryModule,
  Mapper,
  MapperResult,
  EventModule,
  StreamModule,
  StreamParams,
  AnyModule,
  Joymap,
};

export default {
  createBaseModule,
  createQueryModule,
  createEventModule,
  createStreamModule,
  createJoymap,
};

