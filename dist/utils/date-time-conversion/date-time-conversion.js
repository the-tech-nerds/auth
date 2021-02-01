"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtractDay = exports.addDay = exports.addMinutes = exports.UtcDateToLocal = exports.LocalDateToUtc = exports.CurrentDate = void 0;
const moment = require("moment");
function CurrentDate(format = 'YYYY-MM-DD') {
    return moment().format(format);
}
exports.CurrentDate = CurrentDate;
function LocalDateToUtc(date) {
    const utcDate = moment(date)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
    return new Date(utcDate);
}
exports.LocalDateToUtc = LocalDateToUtc;
function UtcDateToLocal(date) {
    return moment
        .utc(date)
        .local()
        .format('YYYY-MM-DD HH:mm:ss');
}
exports.UtcDateToLocal = UtcDateToLocal;
function addMinutes(date, minutes) {
    return moment(date)
        .add(minutes, 'm')
        .toDate();
}
exports.addMinutes = addMinutes;
function addDay(date, days) {
    return moment(date)
        .add(days, 'd')
        .toDate();
}
exports.addDay = addDay;
function subtractDay(date, days) {
    return moment(date)
        .subtract(days, 'd')
        .toDate();
}
exports.subtractDay = subtractDay;
//# sourceMappingURL=date-time-conversion.js.map