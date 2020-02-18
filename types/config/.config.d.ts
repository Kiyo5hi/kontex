declare const CONFIG: {
    app: {
        name: string;
        description: string;
        baseUrl: string;
        session_salt: never[];
    };
    database: {
        uri: string;
    };
};
export { CONFIG };
