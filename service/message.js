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

    current(messagePayload, data){
        
        let message = `here is what you have for the week: \n`;
        for(let i = 0; i < data.length; i++){
            if(data[i]._id == 'done'){
                message += '\n:trophy: *Done*\n\n';
                for(let j = 0; j < data[i].category.length; j++){
                    message += `${j + 1} - ${data[i].category[j].details} \n`;
                }
            }

            if(data[i]._id == 'next'){
                message += '\n:calendar: *Next*\n\n';
                for(let j = 0; j < data[i].category.length; j++){
                    message += `${j + 1} - ${data[i].category[j].details} \n`;
                }
            }

            if(data[i]._id == 'in-progress'){
                message += '\n:second_place_medal: *In Progress*\n\n';
                for(let j = 0; j < data[i].category.length; j++){
                    message += `${j + 1} - ${data[i].category[j].details} \n`;
                }
            }

            if(data[i]._id == 'block'){
                message += '\n:rotating_light: *Blocking*\n\n';
                for(let j = 0; j < data[i].category.length; j++){
                    message += `${j + 1} - ${data[i].category[j].details} \n`;
                }
            }
            
        }
        this.bot.postMessage(messagePayload.channel, message);
    }
}

module.exports = MessageService;