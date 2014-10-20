export class Api {

  /** Id for api instances */
  public static uuid:string = "";

  /** Class id */
  public __uuid:string;

  /** Root element this api is operating on */
  public root:any;

  /** Are we talking to the shadow dom */
  private _shadow:boolean;

  constructor(root:any) {
    this.root = root;
    this._shadow = false;
    this.__uuid = Api.uuid;
  }

  /** Check if the reference is an api node */
  private isApi(target:any):boolean {
    if (target && target.__uuid) {
      return target.__uuid === Api.uuid;
    }
    return false;
  }

  /** Set the shadow dom state */
  public shadow(value:boolean = true):Api {
    this._shadow = value;
    return this;
  }

  /**
   * Append to the given element a new element of the given type.
   * @param content The inner content.
   * @param type The type to create.
   */
  public append(content:any = '', type:string = 'span'):void {
    if (this.root == null) return;
    if (typeof(content) == 'string') {
      var node = document.createElement(type);
      content = document.createTextNode(content);
      node.appendChild(content);
      content = node;
    }
    else if (this.isApi(content)) {
      content = content.root;
    }
    if (this._shadow) {
      this.root.shadowRoot.appendChild(content);
    }
    else {
      this.root.appendChild(content);
    }
  }

  /** Remove the element the tree */
  public remove():void {
    if (this.root == null) return;
    try {
      this.root.parentNode.removeChild(this.root);
    }
    catch(e) {
    }
  }

  /**
   * Return inner html of root
   * @param shadowDom If true, return shadow dom content instead.
   */
  public html(content:string = null):string {
    if (this.root == null) return '';
    var root = this._shadow ? this.root.shadowRoot : this.root;
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
  public elements(tag:string, filter:string = null, value:string = null):Api[] {
    if (this.root == null) return [];
    var query = this._shadow ? this.root.shadowRoot : this.root;
    var matches:any[] = query.getElementsByTagName(tag);
    var rtn:any[] = [];
    if (filter && value) {
      if (filter.indexOf('data-') == 0) {
        var key = filter.split('data-')[1];
        for (var i = 0; i < matches.length; ++i) {
          if (matches[i].dataset[key] && (matches[i].dataset[key] == value)) {
            rtn.push(new Api(matches[i]));
          }
        }
      }
      else if (filter == "class") {
        for (var i = 0; i < matches.length; ++i) {
          if (new Api(matches[i]).hasClass(value)) {
            rtn.push(new Api(matches[i]));
          }
        }
      }
      else {
        for (var i = 0; i < matches.length; ++i) {
          if (matches[i][filter] && (matches[i][filter] == value)) {
            rtn.push(new Api(matches[i]));
          }
        }
      }
    }
    else {
      for (var i = 0; i < matches.length; ++i) {
        rtn.push(new Api(matches[i]));
      }
    }
    return rtn;
  }

  /** Returns the first match from getElements or null */
  public element(tag:string, filter:string = null, value:string = null):any {
    var rtn = this.elements(tag, filter, value);
    return rtn.length ? rtn[0] : null;
  }

  /** Get an attribute value */
  public attr(tag:string):any {
    if (this.root == null) return null;
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

  /** Return the parent node of the element as an api reference */
  public parent():Api {
    try {
      if (this._shadow) {
        return new Api(this.root.parentNode);
      }
      return new Api(this.root.parent);
    }
    catch(e) {
      console.log("warning: " + this.root + " does not have a parent node");
      return new Api(null);
    }
  }

  /** List of classes on target */
  public classes():string[] {
    if (this.root == null) return [];
    if (!this.root.className) { return []; }
    return this.root.className.split(' ').filter((f) => { return f != ""; });
  }

  /** Has a class? */
  public hasClass(value:string):boolean {
    if (this.root == null) return false;
    return this.classes().filter((f) => { return f == value; }).length > 0;
  }

  /** Add a class */
  public addClass(value:string):void {
    if (this.root == null) return;
    if (!this.hasClass(value)) {
      this.root.className += " " + value;
    }
    console.log(this.root);
  }

  /** Remove a class */
  public removeClass(value:string):void {
    if (this.root == null) return;
    this.root.className = this.classes().filter((f) => { return f != value; }).join(" ");
    console.log(this.root);
  }
}
