import PropTypes from 'prop-types';
const { default: request } = require('~/utils/httpRequest');

export const getCommentByPost = async (
  id,
  p = {
    limit: 10,
    skip: 0,
  },
) => {
  try {
    const result = await request.get(`comments/post/${id}`, {
      params: p,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

getCommentByPost.prototype = { id: PropTypes.string.isRequired };
