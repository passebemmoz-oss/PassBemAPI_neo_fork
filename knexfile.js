// Update with your config settings.

module.exports = {

  /* development: {
    client: 'mysql',
    connection: {
      host : '192.168.1.253',
      user : 'app',
      password : 'App.1234',
      database : 'tempo'
    },
    migrations:{
      directory: "./src/database/migartions"
    },
    useNullAsDefault: true,
  }, */
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations:{
      directory: "./src/database/migartions"
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations:{
      directory: "./src/database/migartions"
    },
    useNullAsDefault: true,
  },   
};






