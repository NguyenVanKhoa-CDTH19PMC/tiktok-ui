import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './CommentsTab.module.scss';
import { getCommentByPost } from '~/services/commentServices';
import { useEffect, useRef, useState } from 'react';
import CommentItem from './CommentItem';
import Loading from '~/components/Loading';

const cx = classNames.bind(style);
function CommentsTab({ postId }) {
  const limit = 10;
  const observerRef = useRef();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const fecthApi = async () => {
    if (isOver) return;
    setLoading(true);
    const commentsResult = await getCommentByPost(postId, { limit: limit, skip: (page - 1) * limit });
    if ((page - 1) * limit + limit >= commentsResult.total) {
      setIsOver(true);
    }
    setComments((pre) => [...pre, ...commentsResult.comments]);
    setLoading(false);
  };
  // console.log('page', page);
  // console.log('loading', loading);
  // console.log('isOver', isOver);

  useEffect(() => {
    if (page > 0) fecthApi();
  }, [page]);
  // use IntersectionObserver để tải thêm khi phần tử vào viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); // Tăng trang
        }
      },
      { threshold: 1.0 }, // Chỉ kích hoạt khi phần tử vào hoàn toàn trong khung nhìn
    );

    if (observerRef.current) observer.observe(observerRef.current); // Quan sát phần tử

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Dọn dẹp
    };
  }, [loading]);
  return (
    <div className={cx('wrapper')}>
      {comments?.map((comment, index) => {
        return <CommentItem key={index} data={comment} />;
      })}
      {loading && (
        <div className={cx('loading-container')}>
          <Loading size={10} />
        </div>
      )}
      {!loading && !isOver && <div ref={observerRef} className={cx('observer')}></div>}
      {isOver && <div className={cx('no-more-noti')}>No more comments</div>}
    </div>
  );
}
CommentsTab.prototype = {
  postId: PropTypes.string.isRequired,
};
export default CommentsTab;
