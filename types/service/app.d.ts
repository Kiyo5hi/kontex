/// <reference types="koa__router" />
import Koa from "koa";
import Router from "@koa/router";
declare module "koa" {
    interface Context {
        config: KontexConfig;
    }
}
export declare class App {
    app: Koa;
    port: number;
    config: KontexConfig;
    constructor(port: number, ...routers: Router[]);
    start(): Promise<void>;
    private useMiddlewares;
    private addRoutes;
}
