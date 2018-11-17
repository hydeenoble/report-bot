class MessageService {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    done(messagePayload){
        this.logger.info('Sending done response message...');
        this.bot.postMessage(messagePayload.channel, 
            'Nice job! Enter another accomplishment for this week using `done`, type `next` to add a goal for next week or use `block` to note something that’s standing in your way.');
    }
    
    next(messagePayload){
        this.logger.info('Sending \'next\' category response message...');
        this.bot.postMessage(messagePayload.channel, 'Place holder messages for `next` category');
    }
    inProgress(messagePayload){
        this.logger.info('Sending \'in-progress\' category response message...');
        this.bot.postMessage(messagePayload.channel, 'Place holder messages for `in-progress` category');


    }
    block(messagePayload){
        this.logger.info('Sending \'block\' category response message...')
        this.bot.postMessage(messagePayload.channel, 'Place holder messages for `block` category');
    }
}

module.exports = MessageService;