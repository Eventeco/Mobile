export const formatTimestamp = timestamp => {
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
