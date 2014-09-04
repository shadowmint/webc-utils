declare module WEBC_UTILS {

  export function $(root: any): Api;

  export class Api {
    public root: any;
    constructor(root: any);
    public innerJson(): any;
    public innerHtml(shadowDom?: boolean): string;
    public getElements(tag: string, filter?: string, value?: string): any;
    public getElement(tag: string, filter?: string, value?: string): any;
  }
}

declare module "webc-utils" {
    export = WEBC_UTILS;
}
