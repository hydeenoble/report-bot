/**
 * Created by EMEHINOLA Idowu on 22/10/2018.
 * objective: building to scale
 * 
 */
const winston = require('winston');
const morgan = require('morgan');
const SlackBot = require('slackbots');

const config = require('../config/config');
const serviceLocator = require('../lib/serviceLocator');
const BotController = require('../controller/bot');
const botService = require('../service/bot')
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

serviceLocator.register('botService', (servicelocator) => {
    const logger = servicelocator.get('logger');
    return new botService(logger);
});

serviceLocator.register('botController', (servicelocator) => {
    const logger = servicelocator.get('logger');
    const bot = servicelocator.get('bot');
    const botService = servicelocator.get('botService');
    return new BotController(logger, bot, botService);
});

module.exports = serviceLocator;
