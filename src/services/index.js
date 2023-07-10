import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    "content-type": "application/json",
  },
});

console.log('token' , sessionStorage.getItem('token'))

export const get = async (url) => axiosInstance.get(url);
export const post = async (url, body, config = {}) => axiosInstance.post(url, body, config);

export const put = async (url, body, config = {}) => axiosInstance.put(url, body, config);
export const patch = async (url, body, config = {}) => axiosInstance.patch(url, body, config);
export const deleted = async (url,body, config = {}) => axiosInstance.delete(url ,body, config);
