const taskModel = require('../models/task');
const Utility = require('../lib/util');
const MongoDBHelper = require('../lib/mongoDBHelper');
class BotService{

    constructor(logger, mongo, messageService){
        this.logger = logger;
        this.mongoDBClientHelper = new MongoDBHelper(mongo, taskModel);
        this.messageService = messageService;
    }

    start(messagePayload){
        console.log(messagePayload);
        const param = {
            user_id: messagePayload.user,
            details: '',
            category: ''
        }

        this.logger.info(JSON.stringify())
    }

    next(messagePayload){
        // @TODO: logic for 'next' command;
    }

    inProgress(messagePayload){
        // @TODO: logic for 'in-progress' command;
    }

    done(messagePayload){
        // @TODO: logic for 'done' command;
        const params = {
            details: messagePayload.details,
            category: messagePayload.command,
            user_id: messagePayload.user,
            team: messagePayload.team,
            channel: messagePayload.channel
        }

        this.logger.info('Params to save to DB for \'done\' category: ', JSON.stringify(params));
        this.messageService.done(messagePayload);
        this.mongoDBClientHelper.save(params)
        .then((res) => {
            this.logger.info('Saved response: ', JSON.stringify(res));
        })
        .catch((error) => {
            this.logger.error('Error saving to Mongo: ', JSON.stringify(error));
        });
    }

    block(messagePayload){
        // @TODO: logic for 'block' command;
    }

    current(messagePayload){
        // @TODO: logic for 'current' command;
    }

    save(messagePayload){
        // @TODO: logic for 'save' command;
    }

    show(messagePayload){
        // @TODO: logic for 'show' command;
    }
}

module.exports = BotService;