const Utility = require('../lib/util');

class MessageService {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }
    
    start(messagePayload, data){
        if(data.length > 0){
            let message = 'Last week you planned to: \n\n';

            for(let i = 0; i < data.length; i++){
                message += `* ${data[i].details} \n\n`;
            }
            this.bot.postMessage(messagePayload.channel,
                `${message}Let’s start with your top accomplishments for the week. Use \`done\` to enter an accomplishment, one at a time, like this: \`done first amazing thing I did this week\`... Pro-tip: keep it short and sweet.`)
        }else{
            this.bot.getUserById(messagePayload.user)
            .then((res) => {
                this.bot.postMessage(messagePayload.channel,
                `${res.real_name}, there weren't any Next items :calendar: in your most recent snippets. Let’s start with your top accomplishments for the week. Use \`done\` to enter an accomplishment, one at a time, like this: \`done first amazing thing I did this week\`... Pro-tip: keep it short and sweet.`)
            })
            
        }
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
        console.log('data structure', JSON.stringify(data));
        if(data.length > 0){
            let message = `here is what you have for the week: \n`;

            let done = '';
            let done_count = 0;
            let next = '';
            let next_count = 0;
            let inProgress = '';
            let inProgress_count = 0;
            let block = '';
            let block_count = 0;
            
            for(let i = 0; i < data.length; i++){
                if(data[i].category == 'done'){
                    done += `${++done_count} - ${data[i].details} \n`
                }

                if(data[i].category == 'next'){
                    next += `${++next_count} - ${data[i].details} \n`
                }

                if(data[i].category == 'in-progress'){
                    inProgress += `${++inProgress_count} - ${data[i].details} \n`
                }

                if(data[i].category == 'block'){
                    block += `${++block_count} - ${data[i].details} \n`
                }
                
            }

            if(done.length > 0){
                message += '\n:trophy: *Done*\n\n';
                message += done;
            }else{
                message += '\n:trophy: *Done*\n\n';
                message += 'X - No Items \n'
            }

            if(next.length > 0){
                message += '\n:calendar: *Next*\n\n';
                message += next;
            }else{
                message += '\n:calendar: *Next*\n\n';
                message += 'X - No Items \n'
            }

            if(block.length > 0){
                message += '\n:rotating_light: *Blocking*\n\n';
                message += block;
            }else{
                message += '\n:rotating_light: *Blocking*\n\n';
                message += 'X - No Items \n'
            }

            if(inProgress.length > 0){
                message += '\n:second_place_medal: *In Progress*\n\n';
                message += inProgress;
            }else{
                message += '\n:second_place_medal: *In Progress*\n\n';
                message += 'X - No Items \n'
            }

            this.bot.getUserById(messagePayload.user)
            .then((res) => {
                this.bot.postMessage(messagePayload.channel, `${res.real_name}, ${message}`);
            });
        }else{
            this.bot.getUserById(messagePayload.user)
            .then((res) => {
                this.bot.postMessage(messagePayload.channel, `Opps!, ${res.real_name} does not have any report yet.`);
            });
        }
    }

    show(messagePayload, data){
        if(data.length > 0) {
            this._transformShowUserData(messagePayload, data)
            .then((res) => {
                this.bot.filesUpload(messagePayload.channel,{
                    filename: 'texting report bot',
                    filetype: 'post',
                    title: `${messagePayload.real_name}'s report for ${messagePayload.numberOfWeeks} weeks`,
                    content: res
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            // .catch();

        }else{
            this.bot.getUserById(messagePayload.user)
            .then((res) => {
                this.bot.postMessage(messagePayload.channel, `Opps!, ${res.real_name} does not have any report yet.`);
            });
        }
    }

    _transformShowUserData(messagePayload, data){
        return new Promise((resolve) => {
            let message = "";

            for(let i = 0; i < messagePayload.weeks.length; i++){

                

                for(let j = 0; j < data.length; j++){

                    if(data[j]._id == messagePayload.weeks[i].week){
                        let payload = data[j].data;
                        
                        message += `## Report for ${messagePayload.real_name}, week of ${Utility.getDateRangeOfWeek(messagePayload.weeks[i].week).from}, \n\n\n\n\n`;
                        if(payload.length > 0){
                            
                            let done = '';
                            let block = '';
                            let inProgress = '';
                            let next = '';

                            for(let k = 0; k < payload.length; k++){

                                if(payload[k].category == 'done'){
                                    done += '* ' + `${payload[k].details}\n\n`
                                }

                                if(payload[k].category == 'next'){
                                    next += '* ' + `${payload[k].details}\n\n`
                                }

                                if(payload[k].category == 'block'){
                                    block += '* ' + `${payload[k].details}\n\n`
                                }

                                if(payload[k].category == 'in-progress'){
                                    inProgress += '* ' + `${payload[k].details}\n\n`
                                }
                                
                            }

                            if(done.length > 0){
                                message += '\n\n### :trophy: *DONE*\n\n';
                                message += done;
                            }

                            if(next.length > 0){
                                message += '\n\n### :calendar: *NEXT*\n\n';
                                message += next;
                            }

                            if(block.length > 0){
                                message += '\n\n### :rotating_light: BLOCKING\n\n';
                                message += block;
                            }

                            if(inProgress.length > 0){
                                message += '\n\n### :second_place_medal: IN PROGRESS\n\n';
                                message += inProgress;
                            }
                        }

                        message += '\n';
                        message += '___________________________________________________';
                        message += '\n';
                    }
                }
            }
            return resolve(message)
        });
    }

    delete(messagePayload){
        this.bot.getUserById(messagePayload.user)
        .then((res) => {
            this.bot.postMessage(messagePayload.channel, `Alright ${res.real_name.split(' ')[1]}, I have removed that report.`);
        });
    }

    show_all(messagePayload, data) {
        let message = `Here is your Team's report: \n`;
        if (data.length > 0) {
            data.forEach(element => {
                const details = element.details;
                message += `\n*${details[0].user_name}'s Report*:\n`;
                details.forEach(record => {
                    if(record.category == 'done'){
                        message += '\n:trophy: *Done*\n\n';
                        message += `${record.details} \n`;
                    }
                    if(record.category == 'next'){
                        message += '\n:calendar: *Next*\n\n';
                        message += `${record.details}\n`;
                    }
                    if(record.category == 'in-progress'){
                        message += '\n:second_place_medal: *In Progress*\n\n';
                        message += `${record.details}\n`;
                    }
                    if(record.category == 'block'){
                        message += '\n:rotating_light: *Blocking*\n\n';
                        message += `${record.details}\n`;
                    }
                });
                
            });
            // this.bot.postMessage(messagePayload.channel, message);
            this.bot.filesUpload(messagePayload.channel,{
                filename: 'texting report bot',
                filetype: 'post',
                title: 'Team Report',
                content: message
            })
            .then((res) => {
                this.logger.info('Team Report Uploaded');
            })
            .catch((error) => {
                console.log(error);
            })
        } else{
            this.bot.postMessage(messagePayload.channel, `Opps!!, your team does not have any report yet. Are they working at all?`);
        }
    }
}

module.exports = MessageService;