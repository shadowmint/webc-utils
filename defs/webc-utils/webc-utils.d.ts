declare module WEBC_UTILS {

  export function $(root: any): Api;
  export function $s(root: any): Api;
  export function log(value: any): void;
  export function uuid(): string;
  export function async(callback: any): void;

  export class Api {
    public root: any;
    private _shadow;
    constructor(root: any);
    public shadow(value?: boolean): Api;
    public append(content?: any, type?: string): void;
    public remove(): void;
    public html(content?: string): string;
    public elements(tag: string, filter?: string, value?: string): any;
    public attr(tag: string): any;
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
