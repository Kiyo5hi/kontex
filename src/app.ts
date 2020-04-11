import Koa from "koa";
import DataBase from "./services/Database";
import reqLogger from "koa-logger";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import { SESSION_CONFIG, SESSION_SECRET } from "./util/secret";

// Controllers (route handlers)
import userRouter from "./controllers/user";
import postRouter from "./controllers/post";
import sessionRouter from "./controllers/session";

// API keys and Passport configuration

// Create Koa server
const app = new Koa();

// Connect to MongoDB
const db = DataBase.getInstance();
db.connect();

// Koa configuration and middlewares
app.keys = [SESSION_SECRET];
app.use(session(SESSION_CONFIG, app));
app.use(reqLogger());
app.use(
  bodyParser({
    onerror: function (err, ctx) {
      ctx.throw("JSON format error", 400);
    },
  })
);

/**
 * Primary app routes.
 */
app.use(userRouter.routes());
app.use(postRouter.routes());
app.use(sessionRouter.routes());

/**
 * API examples routes.
 */

/**
 * OAuth authentication routes. (Sign in)
 */

export default app;
