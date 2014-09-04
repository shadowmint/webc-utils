(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (webc_utils) {
    function get_element(tag) {
        return {};
    }
    webc_utils.get_element = get_element;
})(exports.webc_utils || (exports.webc_utils = {}));
var webc_utils = exports.webc_utils;

try  {
    define('webc_utils', function () {
        return webc_utils;
    });
} catch (e) {
    try  {
        window['webc_utils'] = webc_utils;
    } catch (e) {
    }
}

},{}],2:[function(require,module,exports){
function test_register(t) {
    t.ok(true);
    t.done();
}
exports.test_register = test_register;

},{}]},{},[1,2]);