const taskModel = require('../models/task');
const Utility = require('../lib/util');
const MongoDBHelper = require('../lib/mongoDBHelper');
class BotService{

    constructor(logger, mongo, messageService, bot){
        this.logger = logger;
        this.mongoDBClientHelper = new MongoDBHelper(mongo, taskModel);
        this.messageService = messageService;
        this.bot = bot;
    }

    start(messagePayload){
        // @TODO: logic for 'start' command;
        this.mongoDBClientHelper.find({
            conditions: {
                week: Utility.getCurrentWeek() - 1,
                category: 'next',
                user_id: messagePayload.user,
                team: messagePayload.team
            }
        })
        .then((res) => {
            this.messageService.start(messagePayload, res);
        })
        .catch((error) => {
            this.logger.error('Error fetching from Mongo: ', JSON.stringify(error));
        });
    }

    next(messagePayload){
        // @TODO: logic for 'next' command;
        console.log(messagePayload);
        const params = {
            details: messagePayload.details,
            category: messagePayload.command,
            user_id: messagePayload.user,
            team: messagePayload.team,
            channel: messagePayload.channel
        }

        this.logger.info('Params to save to DB for \'next\' category: ', JSON.stringify(params));
        this.messageService.next(messagePayload);
        this.mongoDBClientHelper.save(params)
        .then((res) => {
            this.logger.info('Saved response: ', JSON.stringify(res));
        })
        .catch((error) => {
            this.logger.error('Error saving to Mongo: ', JSON.stringify(error));
        });
    }

    inProgress(messagePayload){
        // @TODO: logic for 'in-progress' command;
        console.log(messagePayload);
        const params = {
            details: messagePayload.details,
            category: messagePayload.command,
            user_id: messagePayload.user,
            team: messagePayload.team,
            channel: messagePayload.channel
        }

        this.logger.info('Params to save to DB for \'in-progress\' category: ', JSON.stringify(params));
        this.messageService.inProgress(messagePayload);
        this.mongoDBClientHelper.save(params)
        .then((res) => {
            this.logger.info('Saved response: ', JSON.stringify(res));
        })
        .catch((error) => {
            this.logger.error('Error saving to Mongo: ', JSON.stringify(error));
        });
    }

    done(messagePayload){
        // @TODO: logic for 'done' command;
        console.log(messagePayload);
        const params = {
            details: messagePayload.details,
            category: messagePayload.command,
            user_id: messagePayload.user,
            team: messagePayload.team,
            channel: messagePayload.channel,
            // week: 45
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
        console.log(messagePayload);
        const params = {
            details: messagePayload.details,
            category: messagePayload.command,
            user_id: messagePayload.user,
            team: messagePayload.team,
            channel: messagePayload.channel
        }

        this.logger.info('Params to save to DB for \'block\' category: ', JSON.stringify(params));
        this.messageService.block(messagePayload);
        this.mongoDBClientHelper.save(params)
        .then((res) => {
            this.logger.info('Saved response: ', JSON.stringify(res));
        })
        .catch((error) => {
            this.logger.error('Error saving to Mongo: ', JSON.stringify(error));
        });
    }

    current(messagePayload){
        // @TODO: logic for 'current' command;
        this.mongoDBClientHelper.find({
            conditions: {
                user_id: messagePayload.user,
                week: Utility.getCurrentWeek(),
                team: messagePayload.team
            }
        })
        .then((data) => {
            this.messageService.current(messagePayload, data);
        })
        .catch((error) => this.logger.error(error));
    }

    save(messagePayload){
        // @TODO: logic for 'save' command;
    }

    show(messagePayload){
        // @TODO: logic for 'show' command;
        messagePayload.current_user = messagePayload.user;
        let detailsArray = messagePayload.details.split(' ');
        let reportOwner = detailsArray[0];
        let numberOfWeeks = detailsArray[1];

        if(Utility.isUser(reportOwner)){
            messagePayload.user = Utility.extractUserId(reportOwner);
            messagePayload.numberOfWeeks = numberOfWeeks;
            messagePayload.weeks = Utility.getWeeks(messagePayload.numberOfWeeks);

            if(messagePayload.numberOfWeeks){
                
                this.bot.getUserById(messagePayload.user)
                .then((res) => {
                    messagePayload.real_name = res.real_name;
                    this.mongoDBClientHelper.aggregate({
                        conditions: [
                            { $match: {
                                user_id: messagePayload.user,
                                team: messagePayload.team,
                                $or: messagePayload.weeks
                            }},
                            { $group: {
                                _id: "$week",
                                data: { $push: "$$ROOT" }
                            }},
                            { $sort: { _id: 1 } }
                        ]
                    })
                    .then((data) => {
                        this.messageService.show(messagePayload, data); 
                    })
                })
                .catch((error) => this.logger.error(error));
            }else{
                this.current(messagePayload);
            }
        }else{

        }
    }

    delete(messagePayload){
        let detailsArray = messagePayload.details.split(' ');
        let command = detailsArray[0];
        let position = detailsArray[1];
        console.log(position, command);

        this.mongoDBClientHelper.find({
            conditions: {
                user_id: messagePayload.user,
                week: Utility.getCurrentWeek(),
                team: messagePayload.team,
                category: command
            }
        })
        .then((data) => {
            this.mongoDBClientHelper.delete({
                conditions: {
                    _id: data[position]._id
                }
            })
            .then((res) => {
                console.log(JSON.stringify(res));
                this.messageService.delete(messagePayload);
            })
        })
        .catch((error) => this.logger.error(error));
    }
}

module.exports = BotService;