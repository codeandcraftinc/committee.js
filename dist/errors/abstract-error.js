'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @todo
 */
class AbstractError extends Error {
  /**
   * @todo
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
exports.default = AbstractError;