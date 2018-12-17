require('dotenv')
  .config();

const appName = 'Sport Compass Test';

const config = {
  appName,
  port: process.env.PORT,
  postgresql: {
    connectionString: process.env.PG_CONNECTION_STRING,
  },
  outputDir: `${__dirname.replace('config', 'logs')}/session${new Date().getTime()}.txt`
};

module.exports = config;
