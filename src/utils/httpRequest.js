import PropTypes from 'prop-types';
import axios from 'axios';
// axios.defaults.withCredentials = true;
const request = axios.create({
  baseURL: process.env.REACT_APP_BASS_URL,
});
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
