interface KontexConfig {
    app: {
        name: string;
        description: string;
        baseUrl: string;
        session_salt: [string];
    };
    database: {
        uri: string;
    };
}
