import api = require('./api');

export module webc_utils {

  /** Is debugging enabled */
  export var debug:boolean = true;

  /** Generate a new api for the given element */
  export function $(root:any):api.Api {
    return root && root.root ? root : new api.Api(root);
  }

  /** Generate a new api for the given element's shadow dom */
  export function $s(root:any):api.Api {
    var rtn = $(root);
    rtn.shadow(true);
    return rtn;
  }

  /** Trace a message, if debugging is enabled */
  export function log(msg:any):void {
    try {
      if (debug) {
        console.log(msg);
      }
    }
    catch(e) {
    }
  }

  /** Run something async */
  export function async(callback) {
    setTimeout(callback, 1);
  };

  /** Surprisingly useful helper to generate a uuid */
  export function uuid():string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };

  // Generate a uuid for the module
  api.Api.uuid = uuid();
}

// Export module
declare var define:any;
try { define('webc-utils', function () { return webc_utils; }); } catch (e) {
    try { window['webc-utils'] = webc_utils; } catch(e) {}
}
