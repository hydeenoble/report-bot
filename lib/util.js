const Utility = {

    getWeekNumber: (current_date) => {
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

        // console.log('textArray', textArray);

        const firstSubText = textArray[0].trim();
        const secondSubText = (textArray[1]) ? textArray[1].trim() : '';

        let regex = RegExp("^(<@)[A-Z0-9]*>$");

        if(regex.test(firstSubText)){
            return [secondSubText, textArray.slice(2).join(' ')];
        }else{
            let details = text.slice(1);
            return [firstSubText, textArray.slice(1).join(' ')];
        }
    }
}

module.exports = Utility;