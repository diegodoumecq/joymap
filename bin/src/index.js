"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createBaseModule: true,
  BaseModule: true,
  createQueryModule: true,
  QueryModule: true,
  MapperResult: true,
  Mapper: true,
  createEventModule: true,
  EventModule: true,
  createStreamModule: true,
  StreamModule: true,
  StreamParams: true,
  createJoymap: true,
  Joymap: true,
  AnyModule: true
};
Object.defineProperty(exports, "createBaseModule", {
  enumerable: true,
  get: function get() {
    return _base.default;
  }
});
Object.defineProperty(exports, "BaseModule", {
  enumerable: true,
  get: function get() {
    return _base.BaseModule;
  }
});
Object.defineProperty(exports, "createQueryModule", {
  enumerable: true,
  get: function get() {
    return _query.default;
  }
});
Object.defineProperty(exports, "QueryModule", {
  enumerable: true,
  get: function get() {
    return _query.QueryModule;
  }
});
Object.defineProperty(exports, "MapperResult", {
  enumerable: true,
  get: function get() {
    return _query.MapperResult;
  }
});
Object.defineProperty(exports, "Mapper", {
  enumerable: true,
  get: function get() {
    return _query.Mapper;
  }
});
Object.defineProperty(exports, "createEventModule", {
  enumerable: true,
  get: function get() {
    return _event.default;
  }
});
Object.defineProperty(exports, "EventModule", {
  enumerable: true,
  get: function get() {
    return _event.EventModule;
  }
});
Object.defineProperty(exports, "createStreamModule", {
  enumerable: true,
  get: function get() {
    return _stream.default;
  }
});
Object.defineProperty(exports, "StreamModule", {
  enumerable: true,
  get: function get() {
    return _stream.StreamModule;
  }
});
Object.defineProperty(exports, "StreamParams", {
  enumerable: true,
  get: function get() {
    return _stream.StreamParams;
  }
});
Object.defineProperty(exports, "createJoymap", {
  enumerable: true,
  get: function get() {
    return _Joymap.default;
  }
});
Object.defineProperty(exports, "Joymap", {
  enumerable: true,
  get: function get() {
    return _Joymap.Joymap;
  }
});
Object.defineProperty(exports, "AnyModule", {
  enumerable: true,
  get: function get() {
    return _Joymap.AnyModule;
  }
});
exports.default = void 0;

var _base = _interopRequireWildcard(require("./baseModule/base"));

var _query = _interopRequireWildcard(require("./queryModule/query"));

var _event = _interopRequireWildcard(require("./eventModule/event"));

var _stream = _interopRequireWildcard(require("./streamModule/stream"));

var _Joymap = _interopRequireWildcard(require("./Joymap"));

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  createBaseModule: _base.default,
  createQueryModule: _query.default,
  createEventModule: _event.default,
  createStreamModule: _stream.default,
  createJoymap: _Joymap.default
};
exports.default = _default;
//# sourceMappingURL=index.js.map