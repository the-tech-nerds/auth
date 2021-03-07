import moment = require('moment');

export function CurrentDate(format = 'YYYY-MM-DD') {
  return moment().format(format);
}

export function LocalDateToUtc(date: Date) {
  const utcDate = moment(date)
    .utc()
    .format('YYYY-MM-DD HH:mm:ss');
  return new Date(utcDate);
}

export function UtcDateToLocal(date: Date) {
  return moment
    .utc(date)
    .local()
    .format('YYYY-MM-DD HH:mm:ss');
}

export function addMinutes(date: Date, minutes: number) {
  return moment(date)
    .add(minutes, 'm')
    .toDate();
}
export function addDay(date: Date, days: number) {
  return moment(date)
    .add(days, 'd')
    .toDate();
}

export function subtractDay(date: Date, days: number) {
  return moment(date)
    .subtract(days, 'd')
    .toDate();
}
