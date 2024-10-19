import PropTypes from 'prop-types';
const { default: request } = require('~/utils/httpRequest');

export const getPost = async (id) => {
  try {
    const result = await request.get(`posts/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPosts = async (
  p = {
    limit: 10,
    skip: 0,
    // select:{title,reactions,userId}
  },
) => {
  try {
    const result = await request.get('https://dummyjson.com/posts', {
      params: p,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

getPost.prototype = {
  id: PropTypes.string.isRequired,
};
getPosts.prototype = {
  p: PropTypes.object,
};
