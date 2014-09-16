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
   * Append to the given element a new element of the given type.
   * @param content The inner content.
   * @param type The type to create.
   */
  public append(content:string = '', type:string = 'span'):void {
    var node = document.createElement(type);
    node.innerHTML = content;
    this.root.appendChild(node);
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
    var query = (this.root.shadowRoot != null) && (this.root.shadowRoot.children.length > 0) ? this.root.shadowRoot : this.root;
    var matches:any[] = query.getElementsByTagName(tag);
    if (filter && value) {
      var rtn:any[] = [];
      if (filter.indexOf('data-') == 0) {
        var key = filter.split('data-')[1];
        for (var i = 0; i < matches.length; ++i) {
          if (matches[i].dataset[key] && (matches[i].dataset[key] == value)) {
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

  /** Return the parent node of the element as an api reference, escaping shadow dom box */
  public parent():Api {
    return new Api(this.root.parentNode);
  }
}
