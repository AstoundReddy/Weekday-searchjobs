import axios from "axios";

const local = "http://localhost:5000/";
const proxy = "https://orderaheadproxyserver.azurewebsites.net/";
const BASE_URL = local;

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  console.log(config.data, "config.data");
  console.log(config.url, "config.url");
  return config;
});
export default apiInstance;
