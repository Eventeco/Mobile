const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatTimestamp = timestamp => {
  const formatMinutes = minutes =>
    minutes.length === 1 ? `0${minutes}` : minutes;
  const dateObject = new Date(timestamp);
  const day = days[dateObject.getDay()];
  const month = months[dateObject.getMonth()];
  const date = dateObject.getDate() + 1;
  const hours = dateObject.getHours();
  const minutes = formatMinutes(dateObject.getMinutes());
  return `${day}, ${month} ${date}, ${hours}:${minutes} GMT +3:00`;
};

export const getDayAndDate = date => {
  const dateToFormat = new Date(date);
  const day = days[dateToFormat.getDay()];
  const month = months[dateToFormat.getMonth()];
  const dateNumber = dateToFormat.getDate() + 1;
  const year = dateToFormat.getFullYear();
  return `${day}, ${month} ${dateNumber} ${year}`;
};

const toThreeSF = number => {
  return number < 10 && number > -10 ? `${number}:00` : number;
};

export const getTimeAndTimezone = date => {
  const dateToFormat = new Date(date);
  const hours = dateToFormat.getHours();
  const minutes = dateToFormat.getMinutes();
  const timezone = dateToFormat.getTimezoneOffset() / 60;
  return `${hours}:${minutes} GMT ${toThreeSF(timezone)}`;
};
