import Router from "@koa/router";
import { Context, DefaultState } from "koa";

const router = new Router<DefaultState, Context>({ prefix: "/session" });

router.post("/", async function (ctx, next) {
  await next();
});

export default router;
