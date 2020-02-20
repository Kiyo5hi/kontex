interface KontexConfig {
  app: {
    name: string;
    description: string;
    baseUrl: string;
    session_salt: [string];
    theme: import('../themes/kontexTheme').KontexTheme;
  };
  database: {
    uri: string;
  };
}
