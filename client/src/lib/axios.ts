import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROXY_URL || "http://localhost:5000/api",
  // timeout: 10000,
});

export { axiosInstance as axios };
