const Utility = require('../lib/util');
const config = require('../config/config');
class BotController {

    constructor(logger, bot, service){
        this.logger = logger;
        this.bot = bot;
        this.service = service;
    }

    routeMessage(messagePayload){

        if(messagePayload.user){
            this.bot.getChannelById(messagePayload.channel)
            .then((isChannel) => {
                if(isChannel && messagePayload.text.split(' ')[0].trim() != `<@${config.bot_id}>`){
                    this.logger.info('I am not supposed to response to this');
                    return;
                }else{
                    this.bot.getGroupById(messagePayload.channel)
                    .then((isPrivateChannel) => {
                        if(isPrivateChannel && messagePayload.text.split(' ')[0].trim() != `<@${config.bot_id}>`){
                            this.logger.info('I am not supposed to response to this');
                            return;
                        }else{
                            const extractedMessage = Utility.extractMessage(messagePayload.text);
                            messagePayload.details = extractedMessage[1];
                            messagePayload.command = extractedMessage[0].toLowerCase();
                                        
                            switch(messagePayload.command){
                                case 'help':
                                    this.sendHelpMessage(messagePayload);
                                break;
                                case 'start':
                                    this.service.start(messagePayload);
                                    break;
                                case 'next':
                                    this.service.next(messagePayload);
                                    break;
                                case 'done':
                                    this.service.done(messagePayload);
                                    break;
                                case 'in-progress':
                                    this.service.inProgress(messagePayload);
                                    break;
                                case 'block':
                                    this.service.block(messagePayload);
                                    break;
                                case 'current':
                                    this.service.current(messagePayload);
                                    break;
                                case 'save':
                                    this.service.save(messagePayload);
                                    break;
                                case 'show':
                                    this.service.show(messagePayload);
                                    break;
                                default:
                                    this.sendDefaultMessage(messagePayload);
                            }
                        }
                    });
                }
            });
        }
    }

    sendHelpMessage(messagePayload){
        this.bot.getUserById(messagePayload.user)
        .then((res) => {
            this.bot.postMessage(messagePayload.channel, 
                `${res.real_name}, here are some tips:
    • \`start\` - starts a snippet reporting session
    • \`done\` - adds an accomplishment for the current week (ending Friday)
    • \`next\` - adds an objective for next week (starting Monday)
    • \`in-progress\` - adds on work in process for the current week
    • \`block\` - adds a note about something standing in your way
    • \`current\` - shows your report for the current week
    • \`save\` - tell @reportbot your report for the week is complete
    • \`show @username #\` - displays most recent snippets for @username, optional # of weeks
    • \`show #channelname #\` - displays the most recent published snippets for everyone in a channel, optional # of weeks
                `);
        });
    }

    sendDefaultMessage(messagePayload){
        this.bot.getUserById(messagePayload.user)
        .then((res) => {
            this.bot.postMessage(messagePayload.channel, 
                `I'm feeling :confounded:, ${res.real_name}. Try \`help\`?`);
        });
    }
}

module.exports = BotController;