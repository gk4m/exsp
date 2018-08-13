import ls from '../utils/localStorage';
import api from '../api';

export default {

  async login() {
    try {
      const response = await api.auth.getUserAuthURL();
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (e) {
      console.log(e);
    }
  },

  logout() {

  },

  refreshToken() {

  },

  isLogged() {

  },

  setAccessToken(token) {
    ls.set('token', token);
  },

  setRefreshToken(token) {
    ls.set('refreshToken', token);
  },

  setExpiryTime(time) {
    ls.set('expiry', time);
  }
};
