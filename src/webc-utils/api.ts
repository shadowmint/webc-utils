export class Api {

  /** Root element this api is operating on */
  public root:any;

  constructor(root:any) {
    this.root = root;
  }

  /**
   * Parse inner content as json and return as an object
   * This is for parsing the content of a node before it is populated.
   */
  public json():any {
    var raw = this.html();
    try {
      return JSON.parse(raw);
    } catch(e) {
      console.log("Failed");
      console.log(e);
      console.log(raw);
    }
    return {};
  }

  /**
   * Return inner html of root
   * @param shadowDom If true, return shadow dom content instead.
   */
  public html(content:string = null, shadowDom:boolean = false):string {
    var root = shadowDom ? this.root.shadowRoot : this.root;
    if (content) {
      root.innerHTML = content;
      return content;
    }
    return root.innerHTML;
  }

  /**
   * Get the child elements with the given tag
   * @param tag The tag name, eg. 'my-foo'
   * @param filter The property to filter by, if any.
   * @param value Return only nodes which match filter and value if provided.
   */
  public elements(tag:string, filter:string = null, value:string = null):any {
    console.log(this.root);
    var query = (this.root.shadowRoot != null) && (this.root.shadowRoot.children.length > 0) ? this.root.shadowRoot : this.root;
    console.log(query);
    console.log(query.innerHTML);
    console.log(tag);
    var matches:any[] = query.getElementsByTagName(tag);
    console.log(matches);
    console.log(filter + " -- " + value);
    if (filter && value) {
      var rtn:any[] = [];
      if (filter.indexOf('data-') == 0) {
        console.log("Data query!");
        var key = filter.split('data-')[1];
        for (var i = 0; i < matches.length; ++i) {
          if (matches[i].dataset[key] && (matches[i].dataset[key] == value)) {
            console.log("Match for value: " + matches[i].dataset);
            rtn.push(matches[i]);
          }
        }
      }
      else {
        for (var i = 0; i < matches.length; ++i) {
          if (matches[i][filter] && (matches[i][filter] == value)) {
            rtn.push(matches[i]);
          }
        }
      }
      matches = rtn;
    }
    return matches;
  }


  /** Returns the first match from getElements or null */
  public element(tag:string, filter:string = null, value:string = null):any {
    var rtn = this.elements(tag, filter, value);
    return rtn.length ? rtn[0] : null;
  }
}
