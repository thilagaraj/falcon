import moment from "moment";

// Formatters
const formatDateForDisplay = (dateValue, format = "DD/MM/YYYY") => {
  return moment(dateValue).format(format);
};

const formatDateForDb = (dateValue, format = "YYYY-MM-DD") => {
  return moment(dateValue).format(format);
};

// Date Utils
const getCurrentDate = (format = 'DD/MM/YYYY') => moment().format(format);

const getYesterdayDate = () => moment().subtract(1, "day");

const getTomorrowDate = () => moment().add(1, "day");

const getThisWeekDates = () => {
  const startDate = moment().startOf("week");
  const endDate = moment().endOf("week");
  return { startDate, endDate };
};

const getLastWeekDates = () => {
  const startDate = moment().subtract(1, "week").startOf("week");
  const endDate = moment().subtract(1, "week").endOf("week");
  return { startDate, endDate };
};

const getThisMonthDates = () => {
  const startDate = moment().startOf("month");
  const endDate = moment().endOf("month");
  return { startDate, endDate };
};

const getLastMonthDates = () => {
  const startDate = moment().subtract(1, "month").startOf("month");
  const endDate = moment().subtract(1, "month").endOf("month");
  return { startDate, endDate };
};

const addDays = (stDay, noOfDays) => {
  return moment(stDay).add(noOfDays, "days");
};

const formatHeaderDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('default', { month: 'short' });
  const weekday = d.toLocaleString('default', { weekday: 'short' });
  return { month, day,weekday };
};

const toIsoDate = (dateStr) => {
  return moment(dateStr).format('YYYY-MM-DD');
};

export {
  formatDateForDisplay,
  formatDateForDb,
  getCurrentDate,
  getYesterdayDate,
  getTomorrowDate,
  getThisWeekDates,
  getLastWeekDates,
  getThisMonthDates,
  getLastMonthDates,
  addDays,
  moment,
  formatHeaderDate,
  toIsoDate
};
