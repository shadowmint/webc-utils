(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Api = (function () {
    function Api(root) {
        this.root = root;
    }
    Api.prototype.json = function () {
        var raw = this.html();
        try  {
            return JSON.parse(raw);
        } catch (e) {
            console.log("Failed");
            console.log(e);
            console.log(raw);
        }
        return {};
    };

    Api.prototype.html = function (content, shadowDom) {
        if (typeof content === "undefined") { content = null; }
        if (typeof shadowDom === "undefined") { shadowDom = false; }
        var root = shadowDom ? this.root.shadowRoot : this.root;
        if (content) {
            root.innerHTML = content;
            return content;
        }
        return root.innerHTML;
    };

    Api.prototype.elements = function (tag, filter, value) {
        if (typeof filter === "undefined") { filter = null; }
        if (typeof value === "undefined") { value = null; }
        console.log(this.root);
        var query = (this.root.shadowRoot != null) && (this.root.shadowRoot.children.length > 0) ? this.root.shadowRoot : this.root;
        console.log(query);
        console.log(query.innerHTML);
        console.log(tag);
        var matches = query.getElementsByTagName(tag);
        console.log(matches);
        console.log(filter + " -- " + value);
        if (filter && value) {
            var rtn = [];
            if (filter.indexOf('data-') == 0) {
                console.log("Data query!");
                var key = filter.split('data-')[1];
                for (var i = 0; i < matches.length; ++i) {
                    if (matches[i].dataset[key] && (matches[i].dataset[key] == value)) {
                        console.log("Match for value: " + matches[i].dataset);
                        rtn.push(matches[i]);
                    }
                }
            } else {
                for (var i = 0; i < matches.length; ++i) {
                    if (matches[i][filter] && (matches[i][filter] == value)) {
                        rtn.push(matches[i]);
                    }
                }
            }
            matches = rtn;
        }
        return matches;
    };

    Api.prototype.element = function (tag, filter, value) {
        if (typeof filter === "undefined") { filter = null; }
        if (typeof value === "undefined") { value = null; }
        var rtn = this.elements(tag, filter, value);
        return rtn.length ? rtn[0] : null;
    };
    return Api;
})();
exports.Api = Api;

},{}],2:[function(require,module,exports){
var api = require('./api');

(function (webc_utils) {
    webc_utils.debug = true;

    function $(root) {
        return new api.Api(root);
    }
    webc_utils.$ = $;

    function log(msg) {
        try  {
            if (webc_utils.debug) {
                console.log(msg);
            }
        } catch (e) {
        }
    }
    webc_utils.log = log;
})(exports.webc_utils || (exports.webc_utils = {}));
var webc_utils = exports.webc_utils;

try  {
    define('webc-utils', function () {
        return webc_utils;
    });
} catch (e) {
    try  {
        window['webc-utils'] = webc_utils;
    } catch (e) {
    }
}

},{"./api":1}],3:[function(require,module,exports){
function test_register(t) {
    t.ok(true);
    t.done();
}
exports.test_register = test_register;

},{}]},{},[1,2,3]);