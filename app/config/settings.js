require('dotenv').config();

const appName = 'Sport Compass Test';

const config = {
  appName,
  port: process.env.PORT,
  mySql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
  },
  outputDir: `${__dirname.replace('config', 'logs')}/session${new Date().getTime()}.txt`
};

module.exports = config;
