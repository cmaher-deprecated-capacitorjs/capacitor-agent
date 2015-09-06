/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var CapacitorAgent = __webpack_require__(1);
	
	var agent = new CapacitorAgent({
	  channelName: 'github.com/capacitorjs/capacitor:example'
	});
	agent.startDevtools('/example-plugin.js');
	
	document.getElementById('inc').addEventListener('click', function () {
	  agent.emit('inc');
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else {
			var a = factory();
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
		
		var _events = __webpack_require__(1);
		
		var capacitorReady = new Promise(function (resolve) {
		  if (window.__capacitor) {
		    resolve(window.__capacitor);
		  } else {
		    (function () {
		      var listener = function listener(event) {
		        var message = event.data;
		        if (event.source !== window || typeof message !== 'object' || message == null || message.name !== 'github.com/capacitorjs/capacitor:ready') {
		          return;
		        }
		        resolve(window.__capacitor);
		        window.removeEventListener('message', listener);
		      };
		      window.addEventListener('message', listener);
		    })();
		  }
		});
		
		var CapacitorAgent = (function () {
		  function CapacitorAgent(_ref) {
		    var _this = this;
		
		    var channelName = _ref.channelName;
		    var _ref$enabled = _ref.enabled;
		    var enabled = _ref$enabled === undefined ? true : _ref$enabled;
		
		    _classCallCheck(this, CapacitorAgent);
		
		    this.channelName = channelName;
		    this.enabled = enabled;
		    this.emitter = new _events.EventEmitter();
		    ['on', 'once', 'removeListener', 'removeAllListeners'].forEach(function (key) {
		      _this[key] = function () {
		        if (_this.enabled) {
		          var _emitter;
		
		          (_emitter = _this.emitter)[key].apply(_emitter, arguments);
		        }
		      };
		    });
		    this.agentReady = new Promise(function (resolve) {
		      _this.resolveAgentReady = resolve;
		    });
		  }
		
		  _createClass(CapacitorAgent, [{
		    key: 'startDevtools',
		    value: function startDevtools(sourceFile) {
		      var _this2 = this;
		
		      capacitorReady.then(function (capacitor) {
		        return capacitor.registerPlugin(_this2, _this2.channelName, sourceFile);
		      }).then(function () {
		        _this2.emitter.once('plugin:ready', function () {
		          _this2.resolveAgentReady();
		        });
		      });
		    }
		  }, {
		    key: 'emit',
		    value: function emit(event, payload) {
		      var _this3 = this;
		
		      if (this.enabled) {
		        this.agentReady.then(function () {
		          _this3.emitter.emit('tunnel:plugin', event, payload);
		        });
		      }
		      return this;
		    }
		  }]);
		
		  return CapacitorAgent;
		})();
		
		exports['default'] = CapacitorAgent;
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.
		
		function EventEmitter() {
		  this._events = this._events || {};
		  this._maxListeners = this._maxListeners || undefined;
		}
		module.exports = EventEmitter;
		
		// Backwards-compat with node 0.10.x
		EventEmitter.EventEmitter = EventEmitter;
		
		EventEmitter.prototype._events = undefined;
		EventEmitter.prototype._maxListeners = undefined;
		
		// By default EventEmitters will print a warning if more than 10 listeners are
		// added to it. This is a useful default which helps finding memory leaks.
		EventEmitter.defaultMaxListeners = 10;
		
		// Obviously not all Emitters should be limited to 10. This function allows
		// that to be increased. Set to zero for unlimited.
		EventEmitter.prototype.setMaxListeners = function(n) {
		  if (!isNumber(n) || n < 0 || isNaN(n))
		    throw TypeError('n must be a positive number');
		  this._maxListeners = n;
		  return this;
		};
		
		EventEmitter.prototype.emit = function(type) {
		  var er, handler, len, args, i, listeners;
		
		  if (!this._events)
		    this._events = {};
		
		  // If there is no 'error' event listener then throw.
		  if (type === 'error') {
		    if (!this._events.error ||
		        (isObject(this._events.error) && !this._events.error.length)) {
		      er = arguments[1];
		      if (er instanceof Error) {
		        throw er; // Unhandled 'error' event
		      }
		      throw TypeError('Uncaught, unspecified "error" event.');
		    }
		  }
		
		  handler = this._events[type];
		
		  if (isUndefined(handler))
		    return false;
		
		  if (isFunction(handler)) {
		    switch (arguments.length) {
		      // fast cases
		      case 1:
		        handler.call(this);
		        break;
		      case 2:
		        handler.call(this, arguments[1]);
		        break;
		      case 3:
		        handler.call(this, arguments[1], arguments[2]);
		        break;
		      // slower
		      default:
		        len = arguments.length;
		        args = new Array(len - 1);
		        for (i = 1; i < len; i++)
		          args[i - 1] = arguments[i];
		        handler.apply(this, args);
		    }
		  } else if (isObject(handler)) {
		    len = arguments.length;
		    args = new Array(len - 1);
		    for (i = 1; i < len; i++)
		      args[i - 1] = arguments[i];
		
		    listeners = handler.slice();
		    len = listeners.length;
		    for (i = 0; i < len; i++)
		      listeners[i].apply(this, args);
		  }
		
		  return true;
		};
		
		EventEmitter.prototype.addListener = function(type, listener) {
		  var m;
		
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
		
		  if (!this._events)
		    this._events = {};
		
		  // To avoid recursion in the case that type === "newListener"! Before
		  // adding it to the listeners, first emit "newListener".
		  if (this._events.newListener)
		    this.emit('newListener', type,
		              isFunction(listener.listener) ?
		              listener.listener : listener);
		
		  if (!this._events[type])
		    // Optimize the case of one listener. Don't need the extra array object.
		    this._events[type] = listener;
		  else if (isObject(this._events[type]))
		    // If we've already got an array, just append.
		    this._events[type].push(listener);
		  else
		    // Adding the second element, need to change to array.
		    this._events[type] = [this._events[type], listener];
		
		  // Check for listener leak
		  if (isObject(this._events[type]) && !this._events[type].warned) {
		    var m;
		    if (!isUndefined(this._maxListeners)) {
		      m = this._maxListeners;
		    } else {
		      m = EventEmitter.defaultMaxListeners;
		    }
		
		    if (m && m > 0 && this._events[type].length > m) {
		      this._events[type].warned = true;
		      console.error('(node) warning: possible EventEmitter memory ' +
		                    'leak detected. %d listeners added. ' +
		                    'Use emitter.setMaxListeners() to increase limit.',
		                    this._events[type].length);
		      if (typeof console.trace === 'function') {
		        // not supported in IE 10
		        console.trace();
		      }
		    }
		  }
		
		  return this;
		};
		
		EventEmitter.prototype.on = EventEmitter.prototype.addListener;
		
		EventEmitter.prototype.once = function(type, listener) {
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
		
		  var fired = false;
		
		  function g() {
		    this.removeListener(type, g);
		
		    if (!fired) {
		      fired = true;
		      listener.apply(this, arguments);
		    }
		  }
		
		  g.listener = listener;
		  this.on(type, g);
		
		  return this;
		};
		
		// emits a 'removeListener' event iff the listener was removed
		EventEmitter.prototype.removeListener = function(type, listener) {
		  var list, position, length, i;
		
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
		
		  if (!this._events || !this._events[type])
		    return this;
		
		  list = this._events[type];
		  length = list.length;
		  position = -1;
		
		  if (list === listener ||
		      (isFunction(list.listener) && list.listener === listener)) {
		    delete this._events[type];
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
		
		  } else if (isObject(list)) {
		    for (i = length; i-- > 0;) {
		      if (list[i] === listener ||
		          (list[i].listener && list[i].listener === listener)) {
		        position = i;
		        break;
		      }
		    }
		
		    if (position < 0)
		      return this;
		
		    if (list.length === 1) {
		      list.length = 0;
		      delete this._events[type];
		    } else {
		      list.splice(position, 1);
		    }
		
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
		  }
		
		  return this;
		};
		
		EventEmitter.prototype.removeAllListeners = function(type) {
		  var key, listeners;
		
		  if (!this._events)
		    return this;
		
		  // not listening for removeListener, no need to emit
		  if (!this._events.removeListener) {
		    if (arguments.length === 0)
		      this._events = {};
		    else if (this._events[type])
		      delete this._events[type];
		    return this;
		  }
		
		  // emit removeListener for all listeners on all events
		  if (arguments.length === 0) {
		    for (key in this._events) {
		      if (key === 'removeListener') continue;
		      this.removeAllListeners(key);
		    }
		    this.removeAllListeners('removeListener');
		    this._events = {};
		    return this;
		  }
		
		  listeners = this._events[type];
		
		  if (isFunction(listeners)) {
		    this.removeListener(type, listeners);
		  } else {
		    // LIFO order
		    while (listeners.length)
		      this.removeListener(type, listeners[listeners.length - 1]);
		  }
		  delete this._events[type];
		
		  return this;
		};
		
		EventEmitter.prototype.listeners = function(type) {
		  var ret;
		  if (!this._events || !this._events[type])
		    ret = [];
		  else if (isFunction(this._events[type]))
		    ret = [this._events[type]];
		  else
		    ret = this._events[type].slice();
		  return ret;
		};
		
		EventEmitter.listenerCount = function(emitter, type) {
		  var ret;
		  if (!emitter._events || !emitter._events[type])
		    ret = 0;
		  else if (isFunction(emitter._events[type]))
		    ret = 1;
		  else
		    ret = emitter._events[type].length;
		  return ret;
		};
		
		function isFunction(arg) {
		  return typeof arg === 'function';
		}
		
		function isNumber(arg) {
		  return typeof arg === 'number';
		}
		
		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}
		
		function isUndefined(arg) {
		  return arg === void 0;
		}
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=capacitor-agent.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=example-agent.bin.js.map