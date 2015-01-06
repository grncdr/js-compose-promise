'use strict';
var Promise = require('any-promise')
var slice = Function.prototype.call.bind(Array.prototype.slice)

module.exports = function compose (f, g) {
  return function () {
    var self = this;
    var args = slice(arguments)
    return Promise.resolve(g.apply(self, args)).then(function (v) {
      args[0] = v
      return f.apply(self, args)
    });
  }
}
