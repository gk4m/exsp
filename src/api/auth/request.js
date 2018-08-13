import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://stark-harbor-25810.herokuapp.com/'
  : 'http://localhost:4040/';

const request = axios.create({
  baseURL
});

export default request;
