import app from "./app";
import { PORT, ENVIRONMENT } from "./util/secret";

/**
 * Start Koa server.
 */

const server = app.listen(process.env.PORT, function () {
  console.log(
    `App is running at http://localhost:${PORT} in ${ENVIRONMENT} mode`
  );
  console.log("Press CTRL-C to stop");
  console.log();
});

export default server;
