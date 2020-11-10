import moment = require("moment");

export function LocalDateToUtc(date: Date){
  const utcDate = moment(date).utc().format("YYYY-MM-DD HH:mm:ss");
    return new Date(utcDate);
}

export function UtcDateToLocal(date: Date){
  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
}