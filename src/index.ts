import createBaseModule, { type BaseModule } from './baseModule/base';
import createEventModule, { type EventModule } from './eventModule/event';
import createJoymap, { type AnyModule, type Joymap } from './JoyMap';
import createQueryModule, {
  type Mapper,
  type MapperResult,
  type QueryModule,
} from './queryModule/query';
import createStreamModule, { type StreamModule, type StreamParams } from './streamModule/stream';

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
