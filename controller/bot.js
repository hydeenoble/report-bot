class BotController {

    constructor(logger, bot){
        this.logger = logger;
        this.bot = bot;
    }

    routeMessage(messagePayload){

        if(messagePayload.user){
            const command = messagePayload.text.split(' ')[0].trim();
            switch(command){
                case 'help':
                    this.sendHelpMessage(messagePayload);
                break;
                default:
                this.sendDefaultMessage(messagePayload);
            }
        }else{

        }
    }

    sendHelpMessage(messagePayload){
        this.bot.getUserById(messagePayload.user)
        .then((res) => {
            this.bot.postMessage(messagePayload.channel, 
                `${res.real_name}, here are some tips: \n
                - \`start\` wakes me up to begina reporting session
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