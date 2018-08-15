import axios from 'axios';
import AuthService from '../services/auth';
import ls from '../utils/localStorage';

const request = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

request.interceptors.request.use(function (config) {
  if (AuthService.getAccessToken()) {
    config.headers.common['Authorization'] = `Bearer ${AuthService.getAccessToken()}`;
  }
  return config;
}, null);

request.interceptors.response.use(null, (error) => {
  const {status} = error.response;
  console.log(status);

  if (AuthService.getAccessToken() && status === 401) {
    ls.clear();
    window.location = ''
  }
});

export default request;
