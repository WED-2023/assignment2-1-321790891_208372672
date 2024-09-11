import axios from 'axios';

const SEREVER_DOMAIN = "http://localhost:3000/";
const api = axios.create({
  baseURL: SEREVER_DOMAIN,
  withCredentials: true,
});
export default api;