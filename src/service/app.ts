import Koa from "koa";
import Router from "@koa/router";
import views from "koa-views";
import serve from "koa-static";
import logger from "koa-logger";
import { CONFIG } from "../config/config";

declare module "koa" {
  interface Context {
    config: KontexConfig;
  }
}

export class App {
  app: Koa;
  port: number;
  config: KontexConfig;

  constructor(port: number, ...routers: Router[]) {
    this.port = port;
    this.config = CONFIG;
    this.app = new Koa();
    this.app.context.config = CONFIG;
    this.useMiddlewares();
    this.addRoutes(routers);
  }

  public async start() {
    this.app.listen(this.port);
    console.log(`Server running on ${this.config.app.baseUrl}:${this.port}.`);
  }

  private async useMiddlewares() {
    this.app.use(logger());
    this.app.use(serve("public"));
    this.app.use(views("views", { autoRender: true, map: { html: "swig" } }));
  }

  private async addRoutes(routers: Router[]) {
    for (let i = 0; i < routers.length; i++) {
      this.app.use(routers[i].routes());
    }
  }
}
