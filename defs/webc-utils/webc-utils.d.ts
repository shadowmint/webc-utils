declare module WEBC_UTILS {

  export function $(root: any): Api;
  export function log(value: any): void;
  export function async(callback: any): void;

  export class Api {
    public root: any;
    constructor(root: any);
    public attr(tag: string): any;
    public html(content?: string, shadowDom?: boolean): string;
    public append(content?: string, type?: string): void;
    public remove(node: any): void;
    public elements(tag: string, filter?: string, value?: string): any;
    public element(tag: string, filter?: string, value?: string): any;
    public parent(): Api;
    public classes(): string[];
    public hasClass(value: string): boolean;
    public addClass(value: string): void;
    public removeClass(value: string): void;
  }
}

declare module "webc-utils" {
    export = WEBC_UTILS;
}
