import axios from 'axios';

const SEREVER_DOMAIN = "https://foxchef-cuisine.cs.bgu.ac.il";
const api = axios.create({
  baseURL: SEREVER_DOMAIN,
  withCredentials: true,
});
export default api;