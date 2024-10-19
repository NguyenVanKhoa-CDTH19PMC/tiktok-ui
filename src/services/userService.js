import PropTypes from 'prop-types';
const { default: request } = require('~/utils/httpRequest');

export const getFollowingAccounts = async () => {
  try {
    const result = await request.get('users/search', {
      params: {
        p: 'a',
        limit: 10,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (id) => {
  try {
    const result = await request.get(`users/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
getUser.prototype = {
  id: PropTypes.string.isRequired,
};
