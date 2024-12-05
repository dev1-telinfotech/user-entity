// app/config/db.config.js
module.exports = {
    // Configuration for development environment
    development: {
      username: "root",
      password: "password",
      database: "user-entity",
      host: "localhost",
      dialect: "mysql",
      define: {
        // Disable automatic timestamps for model fields
        timestamps: false,
        // Define a scope to exclude 'createdAt' and 'updatedAt' fields from queries
        scopes: {
          excludeCreatedAtUpdateAt: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        }
      },
      // Connection pool settings
      pool: {
        max: 5, // Maximum number of connections
        min: 0, // Minimum number of connections
        acquire: 30000, // Maximum time (ms) to try getting a connection before throwing error
        idle: 10000 // Maximum time (ms) that a connection can be idle before being released
      }
    },
  
    // Configuration for test environment
    test: {
      username: "root",
      password: "password",
      database: "user-entity",
      host: "localhost",
      dialect: "mysql",
      define: {
        timestamps: false,
        scopes: {
          excludeCreatedAtUpdateAt: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        }
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  
    // Configuration for production environment
    production: {
      username: "root",
      password: "password",
      database: "user-entity",
      host: "localhost",
      dialect: "mysql",
      define: {
        timestamps: false,
        scopes: {
          excludeCreatedAtUpdateAt: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        }
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  };
  