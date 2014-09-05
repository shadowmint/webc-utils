declare module WEBC_UTILS {

  export function $(root: any): Api;

  export class Api {
    public root: any;
    constructor(root: any);
    public json(): any;
    public html(content?: string, shadowDom?: boolean): string;
    public elements(tag: string, filter?: string, value?: string): any;
    public element(tag: string, filter?: string, value?: string): any;
  }
}

declare module "webc-utils" {
    export = WEBC_UTILS;
}
