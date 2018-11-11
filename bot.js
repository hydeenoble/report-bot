require('dotenv').config();

const serviceLocator = require('./config/di');

const bot = serviceLocator.get('bot');
const botController = serviceLocator.get('botController');

bot.on('message', (messagePayload) => {
    if(messagePayload.type !== 'message'){
        return;
    }
    botController.routeMessage(messagePayload)
});