import {Alert} from 'react-native';
import axios from './axios';
import {SET_USER} from './constants/reducer';
import {format} from 'date-fns';

export const formatTimestamp = timestamp => {
  const formattedDate = format(new Date(timestamp), 'EEEE, LLLL d, H:mm OOOO');
  return formattedDate;
};

export const getDayAndDate = date => {
  const formattedDate = format(new Date(date), 'EEEE, MMMM d yyyy');
  return formattedDate;
};

export const getTime = date => {
  const formattedDate = format(new Date(date), 'H:mm');
  return formattedDate;
};

export const getTimeAndTimezone = date => {
  const formattedDate = format(new Date(date), 'H:mm OOOO');
  return formattedDate;
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
