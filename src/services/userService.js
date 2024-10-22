import PropTypes from 'prop-types';
const { default: request } = require('~/utils/httpRequest');

export const getFollowingAccounts = async (p = { limit: 10, skip: 0 }) => {
  try {
    console.log(p.skip);
    const result = await request.get('users', {
      params: {
        q: 'a',
        limit: p.limit,
        skip: p.skip,
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
