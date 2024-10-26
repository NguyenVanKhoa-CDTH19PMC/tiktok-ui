import PropTypes from 'prop-types';
import { getAuthUser } from './authServices';
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
export const postComment = async (postId, comment) => {
  try {
    const authUser = await getAuthUser();
    const result = await request.post(
      'https://dummyjson.com/comments/add',
      {
        body: comment,
        postId: postId,
        userId: authUser.id,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

getCommentByPost.prototype = { id: PropTypes.string.isRequired };
postComment.prototype = { postId: PropTypes.string.isRequired, comment: PropTypes.string.isRequired };
