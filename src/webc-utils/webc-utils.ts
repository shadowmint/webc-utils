import api = require('./api');

export module webc_utils {

  /** Generate a new api for the given element */
  export function $(root:any):api.Api {
    return new api.Api(root);
  }
}

// Export module
declare var define:any;
try { define('webc-utils', function () { return webc_utils; }); } catch (e) {
    try { window['webc-utils'] = webc_utils; } catch(e) {}
}
