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

    let staticFolders = this.config.app.theme.staticFolder;
    for (let i = 0; i < staticFolders.length; i++) {
      const path = './built/themes/' + this.config.app.theme.name + '/' + staticFolders[i];
      this.app.use(serve(path));
    }

    let view = this.config.app.theme.viewFolder;
    view = './built/themes/' + this.config.app.theme.name + '/' + view;
    let viewMapping = this.config.app.theme.viewMapping;
    this.app.use(views(view, { autoRender: true, map: viewMapping }));
  }

  private async addRoutes(routers: Router[]) {
    for (let i = 0; i < routers.length; i++) {
      this.app.use(routers[i].routes());
    }
  }
}
