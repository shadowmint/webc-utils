export module webc_utils {

  /** Get first matching child element */
  export function get_element(tag:string):any {
    return {}
  }
}

// Export module
declare var define:any;
try { define('webc-utils', function () { return webc_utils; }); } catch (e) {
    try { window['webc-utils'] = webc_utils; } catch(e) {}
}
