import PropTypes from 'prop-types';
import axios from 'axios';
import { getReFreshToken } from '~/services/authServices';
// axios.defaults.withCredentials = true;
const request = axios.create({
  baseURL: process.env.REACT_APP_BASS_URL,
});
// Interceptor add Access Token to request
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
// Interceptor handle error & refresh token
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // isRetryed
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const response = await getReFreshToken(refreshToken);
        console.log(response.accessToken);

        const newAccessToken = response.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return request(originalRequest); // reRequest with new token
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};
export const post = async (path, options = {}) => {
  const response = await request.post(path, options);
  return response.data;
};
get.prototype = {
  path: PropTypes.string.isRequired,
  options: PropTypes.options,
};
post.prototype = {
  path: PropTypes.string.isRequired,
};
export default request;
