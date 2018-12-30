import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import AuthService from '../services/auth';
import ls from '../utils/localStorage';

const request = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

request.interceptors.request.use((config) => {
  const newConfig = { ...config };

  if (AuthService.getAccessToken()) {
    newConfig.headers.common.Authorization = `Bearer ${AuthService.getAccessToken()}`;
  }

  return newConfig;
}, null);

request.interceptors.response.use(null, (error) => {
  const { status, config } = error.response;

  if (AuthService.getAccessToken() && status === 401) {
    ls.clear();

    setTimeout(() => {
      window.location = '';
    }, 300);
  }

  if (status === 503) {
    return axios(config);
  }

  if (status === 429) {
    toastr.error('Error', 'Too Many Requests - Rate limiting has been applied.');
  }

  return error.response;
});

export default request;
