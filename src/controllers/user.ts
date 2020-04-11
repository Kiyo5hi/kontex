import Router from "@koa/router";
import {
  User,
  userJoiSchema as userValidator,
  UserDocument,
} from "../models/User";
import { DefaultState, Context } from "koa";

const router = new Router<DefaultState, Context>({ prefix: "/user" });

router.get("/", async function (ctx, next) {
  const email: string = ctx.query.email;
  try {
    const user = await User.findByEmail(email);
    ctx.response.status = 200;
    ctx.body = user;
  } catch (e) {
    ctx.throw(e, 404);
  }
  await next();
});

router.post("/", async function (ctx, next) {
  const user: UserDocument = ctx.request.body;
  try {
    await userValidator.validateAsync(user);
    await User.create(user);
    ctx.response.status = 201;
    delete user.password;
    ctx.body = user;
  } catch (e) {
    ctx.throw(e, 400);
  }
  await next();
});

export default router;
