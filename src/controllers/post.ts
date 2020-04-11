import Router from "@koa/router";
import {
  postJoiSchema as postValidator,
  Post,
  PostDocument,
} from "../models/Post";
import { DefaultState, Context } from "koa";

const router = new Router<DefaultState, Context>({ prefix: "/post" });

router.post("/", async function (ctx, next) {
  const post: PostDocument = ctx.request.body;
  try {
    await postValidator.validateAsync(post);
    await Post.create(post);
    ctx.response.status = 201;
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 400);
  }
  await next();
});

export default router;
