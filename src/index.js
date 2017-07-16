import 'babel-polyfill';

import createBaseModule from './baseModule/base';
import createQueryModule from './queryModule/query';
import createEventModule from './eventModule/event';
import createJoyMap from './JoyMap';

export default {
    createBaseModule,
    createQueryModule,
    createEventModule,
    createJoyMap
};

export { createBaseModule };
export { createQueryModule };
export { createEventModule };
export { createJoyMap };
