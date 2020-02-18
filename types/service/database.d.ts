import mongoose, { ConnectionOptions } from "mongoose";
export declare class DataBase {
    MONGOOSE_CONFIG: ConnectionOptions;
    uri: string;
    constructor(uri: string);
    connect(): Promise<void>;
    getConnection(): Promise<mongoose.Connection>;
}
