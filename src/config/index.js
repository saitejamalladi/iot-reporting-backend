module.exports = {
  app_host: process.env.APP_HOST,
  jwt: {
    secret: process.env.JWT_SIGNING_KEY,
  },
  sql: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
};
