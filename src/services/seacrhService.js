import PropTypes from 'prop-types';
const { default: request } = require('~/utils/httpRequest');

export const search = async (q, type = 'less') => {
  try {
    const result = await request.get('users/search', {
      params: {
        q,
        type: 'less',
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
search.prototype = {
  q: PropTypes.string.isRequired,
  type: PropTypes.string,
};
