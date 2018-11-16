class MessageService {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    done(messagePayload){
        this.logger.info('Sending done response message...')
        this.bot.postMessage(messagePayload.channel, 
            'Nice job! Enter another accomplishment for this week using `done`, type `next` to add a goal for next week or use `block` to note something that’s standing in your way.');
    }
}

module.exports = MessageService;