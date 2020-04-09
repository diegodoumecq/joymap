import createBaseModule, { BaseModule } from './baseModule/base';
import createQueryModule, { QueryModule } from './queryModule/query';
import createEventModule, { EventModule } from './eventModule/event';
import createStreamModule, { StreamModule } from './streamModule/stream';
import createJoyMap, { JoyMap } from './JoyMap';

export default {
  createBaseModule,
  createQueryModule,
  createEventModule,
  createStreamModule,
  createJoyMap,
};

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
