/** @ignore */
const wildcard = require('../wildcard');

/**
 * Describes a date in the 260-day cycle with a position and a day
 * @example
 *    let day = new Tzolkin(4, "Ajaw");
 *
 * @example
 *    let day = new Tzolkin(4, new TzolkinDay("Ajaw"));
 *
 */
class Tzolkin {
    /**
     * Constructor
     * @param {number} coeff - The position in the 260-day cycle
     * @param {string|TzolkinDay} day
     */
    constructor(coeff, day) {
        if (coeff !== undefined) {
            if (coeff === '*') {
                coeff = wildcard;
            } else if (coeff !== wildcard) {
                coeff = parseInt(coeff);
            }
        }
        if (day !== undefined) {
            if (typeof day === 'string') {
                if (day === '*') {
                    day = wildcard;
                } else {
                    day = _get_day(day);
                }
            }
        }
        /**
         * @type {TzolkinDay}
         */
        this.day = day;
        /**
         * @type {number}
         */
        this.coeff = coeff;

        this.validate();
    }

    /**
     * Return the next day in the 260-day cycle
     * @returns {Tzolkin}
     */
    next() {
        return this.shift(1);
    }

    /**
     * Ensure the Tzolkin's coefficients are within range and the day is defined
     * @return {boolean}
     */
    validate() {
        if (this.coeff > 13 || this.coeff < 1) {
            throw 'Tzolk\'in coefficient must inclusively between 1 and 13.';
        }
        if (this.day === undefined) {
            throw 'Tzolk\'in day must be provided';
        }
        if (this.day !== wildcard) {
            this.day.validate();
        }
        return true;
    }

    /**
     *
     * @param {Number} incremental
     * @return {Tzolkin}
     */
    shift(incremental) {
        let new_coeff = (this.coeff + incremental) % 13;
        new_coeff = (new_coeff % 13) === 0 ? 13 : new_coeff;
        let new_day = this.day.shift(incremental);

        let new_tzolkin = new Tzolkin(new_coeff, new_day);
        new_tzolkin.validate();
        return new_tzolkin;
    }

    /**
     * Ensure this Tzolkin object has the same configuration as another Tzolkin
     * object. Does not take wildcards into account.
     * @param {Tzolkin} new_tzolkin
     * @return {boolean}
     */
    equal(new_tzolkin) {
        return (this.coeff === new_tzolkin.coeff) &&
            (this.name === new_tzolkin.name);
    }

    /**
     * Ensure this Tzolkin object has a matching configuration as another Tzolkin
     * object. Takes wildcards into account.
     * @param {Tzolkin} new_tzolkin
     * @return {boolean}
     */
    match(new_tzolkin) {
        return (
            (this.coeff === wildcard || new_tzolkin.coeff === wildcard) ?
                true :
                (this.coeff === new_tzolkin.coeff)
        ) && (
            (this.day === wildcard || new_tzolkin.day === wildcard) ?
                true :
                (this.name === new_tzolkin.name)
        );
    }

    /**
     * Return a string representation of the 260-day cycle name
     * @returns {string}
     */
    get name() {
        if (this.day === wildcard) {
            return this.day;
        }
        return this.day.name;
    }

    /**
     * Render the 260-day cycle date as a string
     * @returns {string}
     */
    toString(is_numeric) {
        if (is_numeric) {
            return `${this.coeff}:${this.day.day_position}`;
        }
        return `${this.coeff} ${this.name}`;
    }
}

/** @ignore */
const _day_lookup = {};

/** @ignore */
function _get_day(day_name) {
    if (_day_lookup[day_name] === undefined) {
        _day_lookup[day_name] = new TzolkinDay(day_name);
    }
    return _day_lookup[day_name];
}

/**
 * Describes only the day component of a 260-day cycle
 */
class TzolkinDay {
    /**
     * @param {string|number} name - Name or position of the 260-day cycle day
     */
    constructor(name) {
        /**
         * Mapping of day names to indexes
         * @type {Map<number, string>}
         */
        this.days = [
            undefined,
            'Imix',
            'Ik\'',
            'Ak\'bal',
            'K\'an',
            'Chikchan',
            'Kimi',
            'Manik\'',
            'Lamat',
            'Muluk',
            'Ok',
            'Chuwen',
            'Eb',
            'Ben',
            'Ix',
            'Men',
            'Kib',
            'Kaban',
            'Etz\'nab',
            'Kawak',
            'Ajaw',
        ];

        if (typeof name === 'number') {
            name = this.days[name];
        }

        /**
         * Name of the day in the 260-day cycle
         * @type {string}
         */
        this.name = name;

        /**
         * Index of the day in the list of Tzolkin' days
         * @type {number}
         */
        this.day_position = this.days.findIndex(
            d => d === this.name);
    }

    /**
     * Ensure the Tzolk'in day name is defined and is within the list of
     * acceptable day names.
     */
    validate() {
        if (this.name === undefined) {
            throw 'Tzolk\'in day name must be provided';
        }
        if (!this.days.includes(this.name)) {
            throw `Tzolk\'in day (${this.name}) must be in ${this.days}`;
        }
    }

    /**
     * Return the next day in the 260-day cycle
     * @returns {TzolkinDay}
     */
    next() {
        return this.shift(1);
    }

    /**
     *
     * @param {number} incremental
     */
    shift(incremental) {
        let new_incremental = (this.day_position + incremental) % 20;
        new_incremental = (new_incremental === 0) ? 20 : new_incremental;
        return new TzolkinDay(new_incremental);
    }
}

module.exports = {
    'TzolkinDay': TzolkinDay,
    'Tzolkin': Tzolkin,
};
