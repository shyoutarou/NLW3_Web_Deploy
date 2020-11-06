import axios from 'axios';

const api = axios.create({
  baseURL: "https://happy-server-deploy.herokuapp.com",
});

export default api;


