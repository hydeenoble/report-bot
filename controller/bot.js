class BotController {

    constructor(){}

    routeMessage(messagePayload){
        console.log(messagePayload);
    }

    sendHelpMessage(){
        return `
        `;
    }

}

module.exports = BotController;