import PropTypes from 'prop-types';
import request from '~/utils/httpRequest';

export const login = async (credentials) => {
  try {
    const result = await request.post(`auth/login`, credentials);
    localStorage.setItem('accessToken', result.data.accessToken);
    localStorage.setItem('refreshToken', result.data.refreshToken);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAuthUser = async (accessToken) => {
  try {
    const result = await request.get('auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
login.prototype = {
  credentials: PropTypes.object.isRequired,
};
// credentials = {
//      username: 'emilys',
//      password: 'emilyspass',
//       expiresInMins: 30 };

/* providing accessToken in bearer */
