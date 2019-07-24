import moment from 'moment';

const REQUEST_FORMAT = 'YYYY-DD-MM';
const HEADER_FORMAT = 'dddd, MMMM D';

class Date {
    constructor() {
        this.current = moment();
    }

    nextDay() {
        this.current.add(1, 'days');
    }

    prevDay() {
        this.current.subtract(1, 'days');
    }

    formatRequest() {
        return this.current.format(REQUEST_FORMAT);
    }

    formatHeader() {
        return this.current.format(HEADER_FORMAT);
    }
}

export default Date;