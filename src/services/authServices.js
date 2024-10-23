import PropTypes from 'prop-types';
import request from '~/utils/httpRequest';

export const login = async (body) => {
  try {
    const result = await request.post(`auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('accessToken', result.data.accessToken);
    localStorage.setItem('refreshToken', result.data.refreshToken);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAuthUser = async (accessToken) => {
  try {
    console.log(accessToken);
    const result = await request.get('auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
export const getReFreshToken = async (refreshToken) => {
  try {
    const result = await request.post(
      'auth/refresh',
      { refreshToken: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
login.prototype = {
  credentials: PropTypes.object.isRequired,
};
getAuthUser.prototype = { accessToken: PropTypes.string.isRequired };
// credentials = {
//      username: 'emilys',
//      password: 'emilyspass',
//       expiresInMins: 30 };

/* providing accessToken in bearer */
