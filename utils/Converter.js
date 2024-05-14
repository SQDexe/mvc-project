class Converter {
    constructor() { throw new Error('Not a constructor'); }
    static date2str(value) {
        if (!(value instanceof Date) || Number.isNaN(value.valueOf()))
            return null;
        const [year, month, day] = [value.getFullYear(), value.getMonth() + 1, value.getDate()].map(e => String(e).padStart(2, '0'));
        return `${year}-${month}-${day}`;
        }
    static str2date(value) {
        if (typeof value !== 'string')
            return null;
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
        }
    static invertDate(value) {
        if (typeof value !== 'string')
            return null;
        return value.split('-').toReversed().join('-');
        }
    }

module.exports = Converter;