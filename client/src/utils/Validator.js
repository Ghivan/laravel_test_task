const Validator = {
    validateText: text => {
        if (typeof text !== 'string') {
            return false;
        }
        const textToValidate = text.trim();
        return textToValidate.length > 0
    },

    validateYear: year => {
        const currentYear = new Date().getFullYear();
        const yearToValidate = +year;

        return (!isNaN(yearToValidate) &&
            yearToValidate > 1900 &&
            yearToValidate <= currentYear
        );
    },

    validateDuration: duration => {
        const durationToValidate = duration.split(':');

        if (durationToValidate.length !== 2 ||
            durationToValidate[0].length < 1 ||
            durationToValidate[1].length < 2
        ) {
            return false;
        }

        const minutes = +durationToValidate[0];
        const seconds = +durationToValidate[1];

        if (isNaN(minutes)) {
            return false;
        }

        return (!isNaN(seconds) && seconds <= 59)
    }
};

export default Validator;