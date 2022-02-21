import axios from 'axios';
import {Platform} from 'react-native';

const instance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8080'
      : 'http://localhost:8080',
});

export default instance;
