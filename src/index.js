/* @flow */

import 'babel-polyfill';

import createBaseModule from './modules/base';
import createQueryModule from './modules/query';
import createEventModule from './modules/event';
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
