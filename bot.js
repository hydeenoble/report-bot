require('dotenv').config();
const config = require('./config/config');
const bot_token = config.slack_auth.token;

const SlackBot = require('slackbots');

const bot = new SlackBot({
    token: bot_token,
    name: 'reportbot'
});

bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToUser('iemehinola', 'Its working', params);

    // bot.getUser('iemehinola')
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((error) => console.error(error));
});

bot.on('error', (err) => console.log(err))

bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data);
});


function handleMessage(data){
    console.log(data);
    if(data.text === 'help'){
        bot.postMessage(data.channel, 'how may i help?');
    }
}
