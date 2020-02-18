import mongoose, { ConnectionOptions } from "mongoose";

export class DataBase {
  MONGOOSE_CONFIG: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    try {
      await mongoose.connect(this.uri, this.MONGOOSE_CONFIG);
      console.log("Connect to database successfully!");
    } catch (e) {
      console.log(e);
      process.exit();
    }
  }

  public async getConnection() {
    return mongoose.connection;
  }
}
