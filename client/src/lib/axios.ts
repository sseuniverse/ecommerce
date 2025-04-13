import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROXY_URL || "http://192.168.1.7:5000/api",
  // timeout: 10000,
});

export { axiosInstance as axios };
