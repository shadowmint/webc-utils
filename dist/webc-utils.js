(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Api = (function () {
    function Api(root) {
        this.root = root;
        this._shadow = false;
    }
    Api.prototype.shadow = function (value) {
        if (typeof value === "undefined") { value = true; }
        this._shadow = value;
        return this;
    };

    Api.prototype.append = function (content, type) {
        if (typeof content === "undefined") { content = ''; }
        if (typeof type === "undefined") { type = 'span'; }
        if (typeof (content) == 'string') {
            var node = document.createElement(type);
            content = document.createTextNode(content);
            node.appendChild(content);
            content = node;
        }
        if (this._shadow) {
            this.root.shadowRoot.appendChild(content);
        } else {
            this.root.appendChild(content);
        }
    };

    Api.prototype.remove = function () {
        try  {
            this.root.parentNode.removeChild(this.root);
        } catch (e) {
        }
    };

    Api.prototype.html = function (content) {
        if (typeof content === "undefined") { content = null; }
        var root = this._shadow ? this.root.shadowRoot : this.root;
        if (content) {
            root.innerHTML = content;
            return content;
        }
        return root.innerHTML;
    };

    Api.prototype.elements = function (tag, filter, value) {
        if (typeof filter === "undefined") { filter = null; }
        if (typeof value === "undefined") { value = null; }
        var query = this._shadow ? this.root.shadowRoot : this.root;
        var matches = query.getElementsByTagName(tag);
        var rtn = [];
        if (filter && value) {
            if (filter.indexOf('data-') == 0) {
                var key = filter.split('data-')[1];
                for (var i = 0; i < matches.length; ++i) {
                    if (matches[i].dataset[key] && (matches[i].dataset[key] == value)) {
                        rtn.push(new Api(matches[i]));
                    }
                }
            } else if (filter == "class") {
                for (var i = 0; i < matches.length; ++i) {
                    if (new Api(matches[i]).hasClass(value)) {
                        rtn.push(new Api(matches[i]));
                    }
                }
            } else {
                for (var i = 0; i < matches.length; ++i) {
                    if (matches[i][filter] && (matches[i][filter] == value)) {
                        rtn.push(new Api(matches[i]));
                    }
                }
            }
        } else {
            for (var i = 0; i < matches.length; ++i) {
                rtn.push(new Api(matches[i]));
            }
        }
        return rtn;
    };

    Api.prototype.element = function (tag, filter, value) {
        if (typeof filter === "undefined") { filter = null; }
        if (typeof value === "undefined") { value = null; }
        var rtn = this.elements(tag, filter, value);
        return rtn.length ? rtn[0] : null;
    };

    Api.prototype.attr = function (tag) {
        if (tag.indexOf('data-') == 0) {
            var key = tag.split('data-')[1];
            return this.root.dataset[key];
        }
        if (this.root[tag]) {
            return this.root[tag];
        } else {
            try  {
                return this.root.getAttribute(tag);
            } catch (err) {
            }
        }
        return null;
    };

    Api.prototype.parent = function () {
        if (this._shadow) {
            return new Api(this.root.parentNode);
        }
        return new Api(this.root.parent);
    };

    Api.prototype.classes = function () {
        if (!this.root.className) {
            return [];
        }
        return this.root.className.split(' ').filter(function (f) {
            return f != "";
        });
    };

    Api.prototype.hasClass = function (value) {
        return this.classes().filter(function (f) {
            return f == value;
        }).length > 0;
    };

    Api.prototype.addClass = function (value) {
        if (!this.hasClass(value)) {
            this.root.className += " " + value;
        }
        console.log(this.root);
    };

    Api.prototype.removeClass = function (value) {
        this.root.className = this.classes().filter(function (f) {
            return f != value;
        }).join(" ");
        console.log(this.root);
    };
    return Api;
})();
exports.Api = Api;

},{}],2:[function(require,module,exports){
var api = require('./api');

(function (webc_utils) {
    webc_utils.debug = true;

    function $(root) {
        return root && root.root ? root : new api.Api(root);
    }
    webc_utils.$ = $;

    function $s(root) {
        var rtn = $(root);
        rtn.shadow(true);
        return rtn;
    }
    webc_utils.$s = $s;

    function log(msg) {
        try  {
            if (webc_utils.debug) {
                console.log(msg);
            }
        } catch (e) {
        }
    }
    webc_utils.log = log;

    function async(callback) {
        setTimeout(callback, 1);
    }
    webc_utils.async = async;
    ;
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