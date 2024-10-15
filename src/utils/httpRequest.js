import PropTypes from 'prop-types';
import axios from 'axios';
const request = axios.create({
  baseURL: process.env.REACT_APP_BASS_URL,
});
export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};
get.prototype = {
  path: PropTypes.string.isRequired,
  options: PropTypes.options,
};
export default request;
