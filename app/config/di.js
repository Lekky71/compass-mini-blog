/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 */
const winston = require('winston');
const mysql = require('mysql');

const config = require('../config/settings');
const serviceLocator = require('../lib/serviceLocator');
const TriangleController = require('../controllers/triangle.controller');
const TriangleService = require('../service/triangle.service');

/**
 * Returns an instance of logger
 */
/**
 * Returns an instance of logger for the App
 */
serviceLocator.register('logger', () => {
  const consoleTransport = new (winston.transports.Console)({
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    json: false,
    colorize: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
  });
  const transports = [consoleTransport];
    return winston.createLogger({
      transports,
  });
});


/**
 * Returns a mysql connection instance.
 */


serviceLocator.register('mysql', () => {
  const logger = serviceLocator.get('logger');
  const connection = new mysql.createConnection({
    host: config.mySql.host,
    user: config.mySql.user,
    password: config.mySql.password
  });
  connection.connect((error) => {
    if (error) {
      logger.error('mysql could not connect!');
    } else {
      logger.info('mysql connected');
        const dbQuery = `CREATE DATABASE ${config.mySql.database}`;
        connection.query(dbQuery, (err, result) => {
            if (err) {
                logger.error('database may exist already')
            }
            if(result){
                logger.info(`Database ${config.mySql.database} created successfully`);
            }
        })
    }
  });
  return connection;
});

// SERVICE INSTANCES

/**
 * Creates an instance of the service
 */
serviceLocator.register('TriangleService', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  return new TriangleService(logger);
});

// CONTROLLER INSTANCES

/**
 * Creates an instance of the Session controller
 */
serviceLocator.register('triangleController', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('TriangleService');
  return new TriangleController(logger, service);
});

module.exports = serviceLocator;
