/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 */
const winston = require('winston');
const pg = require('pg');
const {Pool} = pg;

const config = require('../config/settings');
const serviceLocator = require('../lib/serviceLocator');
const TriangleController = require('../controllers/triangle.controller');
const TriangleService = require('../service/triangle.service');

const BlogPostController = require('../controllers/post.controller');
const BlogPostService = require('../service/post.service');

const queries = require('../constants/pgQuery');

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


serviceLocator.register('pgClient', () => {
  const logger = serviceLocator.get('logger');
  const client = new Pool({
    connectionString: config.postgresql.connectionString,
    ssl: true,
  });
  client.connect((error) => {
    if (error) {
      logger.error(`could not connect to database : ${JSON.stringify(error)}`);
    } else {
      logger.info('database connected');
      client.query(queries.create_posts_table)
        .then((result) => {
          client.query(queries.create_comments_table)
            .then((result1) => {
            })
            .catch((err1) => {
              this.logger(err1);
            });
        }).catch((err) => {
          this.logger(err);
      });
    }
  });
  return client;
});

// SERVICE INSTANCES

/**
 * Creates instances of services
 */
serviceLocator.register('TriangleService', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  return new TriangleService(logger);
});

serviceLocator.register('BlogPostService', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const pgClient = serviceLocator.get('pgClient');
  return new BlogPostService(logger, pgClient);
});

// CONTROLLER INSTANCES

/**
 * Creates instances of controllers
 */
serviceLocator.register('triangleController', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('TriangleService');
  return new TriangleController(logger, service);
});

serviceLocator.register('blogPostController', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('BlogPostService');
  return new BlogPostController(logger, service);
});

module.exports = serviceLocator;
