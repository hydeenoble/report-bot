const config = {
    slack_auth: {
        token: process.env.TOKEN,
    },
    mongo: {
        connection: {
          host: process.env.MONGODB_HOST,
          username: process.env.MONGODB_USER,
          password: process.env.MONGODB_PASSWORD,
          port: process.env.MONGODB_PORT,
          db: process.env.MONGODB_DATABASE_NAME
        },
        collections: {
          task: 'report_task'
        },
        queryLimit: process.env.MONGODB_QUERY_LIMIT,
      }
}

module.exports = config;