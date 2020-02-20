export const CONFIG = {
  app: {
    name: "Kontex",
    description: "A simple CMS.",
    baseUrl: "localhost",
    session_salt: ["Kontex", "KoaJS"],
    theme: "transitive",
  },
  database: {
    uri:
      "mongodb+srv://kontex:<password>@<host>/kontex?retryWrites=true&w=majority"
  }
};
