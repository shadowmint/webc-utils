export class Api {

  /** Root element this api is operating on */
  public root:any;

  constructor(root:any) {
    this.root = root;
  }

  /**
   * Append to the given element a new element of the given type.
   * @param content The inner content.
   * @param type The type to create.
   */
  public append(content:any = '', type:string = 'span'):void {
    var node = document.createElement(type);
    if (typeof(content) == 'string') {
      content = document.createTextNode(content);
    }
    node.appendChild(content);
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
      else if (filter == "class") {
        for (var i = 0; i < matches.length; ++i) {
          if (new Api(matches[i]).hasClass(value)) {
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

  /** Get an attribute value */
  public attr(tag:string):any {
    if (tag.indexOf('data-') == 0) {
      var key = tag.split('data-')[1];
      return this.root.dataset[key];
    }
    if (this.root[tag]) {
      return this.root[tag];
    }
    else {
      try {
        return this.root.getAttribute(tag);
      }
      catch(err) {
      }
    }
    return null;
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

  /** List of classes on target */
  public classes():string[] {
    if (!this.root.className) { return []; }
    return this.root.className.split(' ').filter((f) => { return f != ""; });
  }

  /** Has a class? */
  public hasClass(value:string):boolean {
    return this.classes().filter((f) => { return f == value; }).length > 0;
  }

  /** Add a class */
  public addClass(value:string):void {
    console.log('add: ' + value);
    if (!this.hasClass(value)) {
      this.root.className += " " + value;
    }
    console.log(this.root);
  }

  /** Remove a class */
  public removeClass(value:string):void {
    console.log('remove: ' + value);
    this.root.className = this.classes().filter((f) => { return f != value; }).join(" ");
    console.log(this.root);
  }
}
