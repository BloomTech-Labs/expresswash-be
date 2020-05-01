require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.LOCAL_DB_HOST,
      port: process.env.LOCAL_DB_PORT,
      user: process.env.LOCAL_DB_USER,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB_DATABASE_DEV,
    },
    pool: {
      min: 2,
      max: 10,
    },
    // useNullAsDefault: true,
    // connection: 'postgres://localhost/databasePG',
    // connection: process.env.DATABASE_URL,
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run('PRAGMA foreign_keys = ON', done);
    //   },
    // },
    // useNullAsDefault: true,
    migrations: {
      directory: "./database/migrationsPG",
    },
    seeds: {
      directory: "./database/seedsPG",
    },
  },
  testing: {
    client: "pg",
    connection: {
      host: process.env.LOCAL_DB_HOST,
      port: process.env.LOCAL_DB_PORT,
      user: process.env.LOCAL_DB_USER,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB_DATABASE_TEST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.RDS_HOSTNAME,
      port: process.env.RDS_PORT,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    // useNullAsDefault: true,
    // connection: process.env.DATABASE_URL,

    // user: `${process.env.DB_USER}`,
    // password: `${process.env.DB_PW}`,
    // host:`${process.env.DB_HOST}`,
    // port:`${process.env.DB_PORT}`
    // connection: process.env.DB_URL,
    migrations: {
      directory: "./database/migrationsPG",
    },
    seeds: {
      directory: "./database/seedsPG",
    },
    // production: {
    //   client: 'sqlite3',
    //   useNullAsDefault: true,
    //   connection: {
    //     filename: './database/database.db3',
    //   },
    //   // connection: process.env.DB_URL,
    //   migrations: {
    //     directory: './database/migrations',
    //   },
    //   seeds: {
    //     directory: './database/seeds'
    //   },
  },
};
