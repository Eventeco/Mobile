import {Alert} from 'react-native';
import axios from './axios';
import {SET_USER, SET_ISSUES} from './constants/reducer';
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
    const issuesResult = await axios.get('/issueTypes');
    dispatch({
      type: SET_ISSUES,
      data: issuesResult.data.data,
    });
  } catch (e) {
    const message = e.response.data.message;
    Alert.alert(message);
  }
};

export const formatBigString = string => {
  if (string.length > 15) {
    return string.substring(0, 15) + '...';
  }
  return string;
};
