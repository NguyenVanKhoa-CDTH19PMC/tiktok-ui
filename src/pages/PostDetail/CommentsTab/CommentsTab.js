import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './CommentsTab.module.scss';
import { getCommentByPost } from '~/services/commentServices';
import { useEffect, useState } from 'react';
import CommentItem from './CommentItem';

const cx = classNames.bind(style);
function CommentsTab({ postId }) {
  const [comments, setComments] = useState();
  const fecthApi = async () => {
    const commentsData = await getCommentByPost(postId);
    setComments(commentsData.comments);
  };
  useEffect(() => {
    fecthApi();
  }, []);
  return (
    <div className={cx('wrapper')}>
      {comments?.map((comment) => {
        return <CommentItem key={comment.id} data={comment} />;
      })}
    </div>
  );
}
CommentsTab.prototype = {
  postId: PropTypes.string.isRequired,
};
export default CommentsTab;
