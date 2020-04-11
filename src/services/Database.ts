import mongoose from "mongoose";
import { MONGODB_URI } from "../util/secret";

export default class Database {
  private static instance: Database = null;
  private uri: string = MONGODB_URI;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    if (this.instance === null) this.instance = new Database();
    return this.instance;
  }

  public connect() {
    mongoose
      .connect(this.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB.");
      })
      .catch((err) => {
        console.log("MongoDB connection error." + err);
        process.exit(1);
      });
  }
}
