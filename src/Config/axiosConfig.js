import axios from "axios";

const BASE_URL = "https://api.weekday.technology/adhoc";

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  return config;
});
export default apiInstance;
