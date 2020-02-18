import { App } from "./service/app";
import { DataBase } from "./service/database";
import { router as indexRouter } from "./routers/index";

async function main() {
  const app = new App(80, indexRouter);
  const db = new DataBase(app.config.database.uri);

  db.connect();
  app.start();
}

main();
