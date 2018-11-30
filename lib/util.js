const config = require('../config/config');
const Utility = {

    getCurrentWeek: () => {
        let current_date = new Date();
        // Copy date so don't modify original
        current_date = new Date(Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        current_date.setUTCDate(current_date.getUTCDate() + 4 - (current_date.getUTCDay()||7));
        // Get first day of year
        let yearStart = new Date(Date.UTC(current_date.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        let weekNo = Math.ceil(( ( (current_date - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return weekNo;
    },

    extractMessage: (text) => {
        let textArray = text.split(' ');

        const firstSubText = textArray[0].trim();
        const secondSubText = (textArray[1]) ? textArray[1].trim() : '';

        let regex = RegExp("^(<@)[A-Z0-9]*>$");
        
        if(regex.test(firstSubText) && firstSubText == `<@${config.bot_id}>`){
            return [secondSubText, textArray.slice(2).join(' ')];
        }else{
            let details = text.slice(1);
            return [firstSubText, textArray.slice(1).join(' ')];
        }

    },

    extractUserId: (rawId) => {
        return rawId.split('@')[1].split('>')[0];
    },

    extractChannelId: (rawId) => {
        return rawId.split('|')[0].split('#')[1];
    },

    isUser: (userId) => {
        let regex = RegExp("^(<@)[A-Z0-9]*>$");
        return regex.test(userId);
    },
    getWeeks: (numberOfWeeks) => {
        result = [];
        currentWeek = Utility.getCurrentWeek();
        
        for(let i = currentWeek; i > (currentWeek - numberOfWeeks); numberOfWeeks--){
            result.push({week: currentWeek - (numberOfWeeks - 1)});
        }

        return result;
    },
    getDateRangeOfWeek: (week) => {
        let current_date = new Date();

        numOfdaysPastSinceLastMonday = eval(current_date.getDay()- 1);
        current_date.setDate(current_date.getDate() - numOfdaysPastSinceLastMonday);

        let current_week = Utility.getCurrentWeek();

        let weeksInTheFuture = eval( week - current_week );

        current_date.setDate(current_date.getDate() + eval( 7 * weeksInTheFuture ));

        let rangeIsFrom = eval(current_date.getMonth()+1) +"/" + current_date.getDate() + "/" + current_date.getFullYear();
        
        current_date.setDate(current_date.getDate() + 4);

        let rangeIsTo = eval(current_date.getMonth()+1) +"/" + current_date.getDate() + "/" + current_date.getFullYear();

        return {from: rangeIsFrom, to: rangeIsTo};
    }
}

module.exports = Utility;