import moment from 'moment';

const REQUEST_FORMAT = 'YYYY-DD-MM';
const HEADER_FORMAT = 'dddd, MMMM D';

class Date {
    constructor(newMoment) {
        if (newMoment) {
            this.current = newMoment;
        } else {
            this.current = moment();
        }
    }

    nextDay() {
        return new Date(this.current.add(1, 'days'));
    }

    prevDay() {
        return new Date(this.current.subtract(1, 'days'));
    }

    formatRequest() {
        return this.current.format(REQUEST_FORMAT);
    }

    formatHeader() {
        return this.current.format(HEADER_FORMAT);
    }
}

export default Date;