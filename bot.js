require('dotenv').config();
const serviceLocator = require('./config/di');

const logger = serviceLocator.get('logger');

const bot = serviceLocator.get('bot');
const botController = serviceLocator.get('botController');

bot.on('message', (messagePayload) => {
    if(messagePayload.type !== 'message'){
        return;
    }
    botController.routeMessage(messagePayload)
});
// const bot_token = config.slack_auth.token;

// const bot = new SlackBot({
//     token: bot_token,
//     name: 'reportbot'
// });

// bot.on('start', () => {
//     bot.postMessageToUser('iemehinola', 'Its working', params);
// });


// bot.on('message', (messagePayload) => {
//     if(messagePayload.type !== 'message'){
//         return;
//     }
//     botController.routeMessage(messagePayload)
// });


// function handleMessage(data){    
//     if(data.user && data.text === 'help'){
//         bot.getUserById(data.user)
//         .then((res) => {
//             bot.postMessage(data.channel, 
//                 `${res.real_name}, Here are some \`tips\`:`);
//         })
//     }
// }

