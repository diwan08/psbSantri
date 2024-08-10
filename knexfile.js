// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_NAME
}= process.env;
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: MYSQL_HOST,
      port: +MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_NAME
    },
    migrations: {
      directory: "./database/migrations"
    }, seeds: {
      directory: "./database/seeder"
    }
  },

};
