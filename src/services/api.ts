import axios from 'axios';

const api = axios.create({
  baseURL: process.env.URL_SERVER_PROD,
});

export default api;


