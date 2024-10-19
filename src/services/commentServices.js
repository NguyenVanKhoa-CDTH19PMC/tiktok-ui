import PropTypes from 'prop-types';
const { default: request } = require('~/utils/httpRequest');

export const getCommentByPost = async (id) => {
  try {
    const result = await request.get(`comments/post/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

getCommentByPost.prototype = { id: PropTypes.string.isRequired };
