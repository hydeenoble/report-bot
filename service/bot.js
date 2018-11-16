const taskModel = require('../models/task');
const Utility = require('../lib/util');
class BotService{

    constructor(logger, mongo){
        this.logger = logger;
        this.mongo = mongo;
    }

    start(messagePayload){
        // @TODO: logic for 'start' command;
        console.log(Utility.getWeekNumber(new Date()));
        const param = {
            
        }
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