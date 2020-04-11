import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";
import { opts } from "koa-session";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV || "dev";

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = process.env["MONGODB_URI"];
export const PORT = process.env["PORT"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}

export const SESSION_CONFIG: Partial<opts> = {
  key: "koa:sess",
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
};
