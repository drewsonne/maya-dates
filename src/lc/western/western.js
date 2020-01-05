class WesternCalendar {
    constructor(julianDay, new_class) {
        this.julianDay = julianDay;
        this.offset = 0;
        this.class = new_class;
    }


    clone(offset) {
        if (offset === undefined) {
            offset = 0;
        }
        return new this.class(this.julianDay + offset);
    }

    get year() {
        if (this.era === 'BCE') {
            return Math.abs(this.date.year + 1);
        }
        return this.date.year;
    }

    get month() {
        return this.date.month;
    }

    get day() {
        return Math.floor(this.date.day) + this.offset;
    }

    get era() {
        return (this.date.year < 0) ? 'BCE' : 'CE';
    }

    toString() {
        return `${this.day}/${this.month}/${this.year} ${this.era}`;
    }
}

module.exports = WesternCalendar;