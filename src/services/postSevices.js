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
    const result = await request.get('posts', {
      params: p,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPostsByUserId = async (
  userId,
  p = {
    limit: 10,
    skip: 0,
  },
) => {
  try {
    const result = await request.get(`posts/user/${userId}`, { params: p });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const postFile = async (file, onUploadProgress) => {
  try {
    const result = await request.post('https://dummyjson.com/c/fe02-d3c1-4632-9e60', file, onUploadProgress);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const postPost = async (data, onUploadProgress) => {
  try {
    const result = await request.post('posts/add', { ...data, userId: 1 }, onUploadProgress);
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
getPostsByUserId.prototype = {
  userId: PropTypes.string.isRequired,
  p: PropTypes.object.isRequired,
};

postPost.prototype = {
  data: PropTypes.string.isRequired,
};
