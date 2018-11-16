const taskModel = require('../models/task');
const Utility = require('../lib/util');
class BotService{

    constructor(logger, mongo, messageService){
        this.logger = logger;
        this.mongo = mongo;
        this.messageService = messageService;
    }

    start(messagePayload){
        // console.log(Utility.getWeekNumber(new Date()));
        console.log(messagePayload);
        const param = {
            user_id: '',
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