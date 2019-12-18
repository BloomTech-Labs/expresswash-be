require('dotenv').config();

module.exports = {
    development: {
      client: 'pg',
      // useNullAsDefault: true,
      connection: 'postgres://localhost/databasePG',
      // connection: process.env.DATABASE_URL,
      // pool: {
      //   afterCreate: (conn, done) => {
      //     conn.run('PRAGMA foreign_keys = ON', done);
      //   },
      // },
      // useNullAsDefault: true,
      migrations: {
        directory: './database/migrationsPG',
      },
      seeds: {
        directory: './database/seedsPG',
      },
    },
    testing: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './database/test.db3',
      },
      // connection: process.env.DATABASE_URL,
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      },
    },
    production: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './database/database.db3',
      },
      // connection: process.env.DB_URL,
      migrations: {
        directory: './database/migrations',
      },
      seeds: { 
        directory: './database/seeds' 
      },
    },
  };
  