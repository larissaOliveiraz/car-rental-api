import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function currentDate() {
  return dayjs().toDate();
}

export function compareInHours(startDate: Date, endDate: Date) {
  const startDateUTC = formatUTC(startDate);
  const endDateUTC = formatUTC(endDate);
  return dayjs(endDateUTC).diff(startDateUTC, "hours");
}

export function compareInDays(startDate: Date, endDate: Date) {
  const startDateUTC = formatUTC(startDate);
  const endDateUTC = formatUTC(endDate);
  return dayjs(endDateUTC).diff(startDateUTC, "days");
}

export function formatUTC(date: Date) {
  return dayjs(date).utc().local().format();
}
