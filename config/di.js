/**
 * Created by EMEHINOLA Idowu on 22/10/2018.
 * objective: building to scale
 * 
 */
const winston = require('winston');
const morgan = require('morgan');
const SlackBot = require('slackbots');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;

const config = require('../config/config');
const serviceLocator = require('../lib/serviceLocator');
const BotController = require('../controller/bot');
const botService = require('../service/bot');

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
   const winstonLogger = new (winston.Logger)({
     transports,
   });
   return winstonLogger;
});

/**
* Returns an instance of HTTP requests logger
*/
serviceLocator.register('requestlogger', () => morgan('common'));

serviceLocator.register('bot', (servicelocator) => {
    const logger = servicelocator.get('logger');
    const bot = new SlackBot({
        token: config.slack_auth.token,
        name: 'reportbot'
    });

    bot.on('start', () => {
        logger.info('Report Bot is online...');
    });

    bot.on('error', (err) => logger.error(err));

    return bot;
});


/**
 * Returns a Mongo connection instance.
 */
serviceLocator.register('mongo', (serviceLocator) => {
    const logger = serviceLocator.get('logger');
    const connectionString = (!config.mongo.connection.username || !config.mongo.connection.password) ?
      `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}` :
      `mongodb://${config.mongo.connection.username}:${config.mongo.connection.password}@${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}`;
  
    mongoose.connect(connectionString);
    const db = mongoose.connection;
  
    db.on('connected', () => {
      logger.info('Mongo Connection Established');
    });
    db.on('error', (err) => {
      logger.error(`Mongo Connection Error : ${err}`);
      process.exit(1);
    });
    db.on('disconnected', () => {
      logger.error('Mongo Connection disconnected');
      process.exit(1);
    });
  
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      db.close(() => {
        logger.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  
    return db;
  });

serviceLocator.register('botService', (servicelocator) => {
    const logger = servicelocator.get('logger');
    const mongo = servicelocator.get('mongo');
    return new botService(logger, mongo);
});

serviceLocator.register('botController', (servicelocator) => {
    const logger = servicelocator.get('logger');
    const bot = servicelocator.get('bot');
    const botService = servicelocator.get('botService');
    return new BotController(logger, bot, botService);
});

module.exports = serviceLocator;
