class BotController {

    constructor(logger, bot, service){
        this.logger = logger;
        this.bot = bot;
        this.service = service;
    }

    routeMessage(messagePayload){

        if(messagePayload.user){
            const command = messagePayload.text.split(' ')[0].trim();
            
            switch(command){
                case 'help':
                    console.log('case is help');
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
    }

    sendHelpMessage(messagePayload){
        this.bot.getUserById(messagePayload.user)
        .then((res) => {
            this.bot.postMessage(messagePayload.channel, 
                `${res.real_name}, here are some tips: \n
                - \`start\` wakes me up to begin a reporting session
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