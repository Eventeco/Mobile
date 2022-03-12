import {Alert} from 'react-native';
import axios from './axios';
import {SET_USER} from './constants/reducer';

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
  const dateToFormat = new Date(timestamp);
  const day = days[dateToFormat.getDay()];
  const month = months[dateToFormat.getMonth()];
  const date = dateToFormat.getDate() + 1;
  const hours = dateToFormat.getHours();
  const minutes = formatMinutes(dateToFormat.getMinutes());
  const timezone = toThreeSF(dateToFormat.getTimezoneOffset() / 60);
  return `${day}, ${month} ${date}, ${hours}:${minutes} GMT ${timezone}`;
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
  const timezone = toThreeSF(dateToFormat.getTimezoneOffset() / 60);
  return `${hours}:${minutes} GMT ${timezone}`;
};

export const loginHandler = async (payload, dispatch) => {
  try {
    const res = await axios.post('/login', payload);
    dispatch({
      type: SET_USER,
      data: res.data.data,
    });
  } catch (e) {
    const message = e.response.data.message;
    Alert.alert(message);
  }
};
