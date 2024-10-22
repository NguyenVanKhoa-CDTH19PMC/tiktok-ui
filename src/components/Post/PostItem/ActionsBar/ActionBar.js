import PropTypes from 'prop-types';
import style from './ActionsBar.module.scss';
import classNames from 'classnames/bind';
import { Image } from '~/components/Images';
import { BookMarkIcon, CommentIcon, HeartIcon, PlusIcon, ShareIcon } from '~/components/Icons';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getCommentByPost } from '~/services/commentServices';
import { numberDisplay } from '~/utils/numberDisplay';
import ReviewProfile from '~/components/ReviewProfile';
import { Link } from 'react-router-dom';
import { config } from '~/config';
const cx = classNames.bind(style);
const ActionsBar = ({ post, author }) => {
  const [comments, setComments] = useState({});
  const [commentTotal, setCommentTotal] = useState(0);
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (post.id) {
      const fetchApi = async () => {
        const commnetData = await getCommentByPost(post.id);
        setComments(commnetData.comments);
        setCommentTotal(commnetData.total);
      };
      fetchApi();
    }
  }, [post]);
  return (
    <>
      {post && (
        <section className={cx('actions-bar')}>
          <ReviewProfile data={author}>
            <div className={cx('avatar-action')}>
              {author.image && <Image fallback="https://placehold.co/48x48/fe2c54/white" src={author.image} alt="" />}
              <button className={cx('follow-btn')}>
                <PlusIcon />
              </button>
            </div>
          </ReviewProfile>
          <button onClick={() => setLike((pre) => !pre)} className={cx('action-btn')}>
            <span className={cx('icon-btn')}>
              {like ? (
                <i className={cx('icon-active', 'like-icon')}>
                  <HeartIcon />
                </i>
              ) : (
                <i className={cx('icon')}>
                  <HeartIcon />
                </i>
              )}
            </span>
            <span className={cx('text-btn')}>{numberDisplay((post.reactions && post.reactions.likes) || '00')}</span>
          </button>
          <Link to={config.routes.post(`@${author.username}`, post.id)}>
            <button className={cx('action-btn')}>
              <span className={cx('icon-btn')}>
                <i className={cx('icon')}></i>
                <CommentIcon />
              </span>
              <span className={cx('text-btn')}>{numberDisplay(commentTotal)}</span>
            </button>
          </Link>
          <button onClick={() => setFavorite((pre) => !pre)} className={cx('action-btn')}>
            <span className={cx('icon-btn')}>
              {favorite ? (
                <i className={cx('icon-active', 'favorite-icon')}>
                  <BookMarkIcon />
                </i>
              ) : (
                <i className={cx('icon')}>
                  <BookMarkIcon />
                </i>
              )}
            </span>
            <span className={cx('text-btn')}>{numberDisplay((post.reactions && post.reactions.dislikes) || '00')}</span>
          </button>
          <button className={cx('action-btn')}>
            <span className={cx('icon-btn')}>
              <i className={cx('icon')}>
                <ShareIcon />
              </i>
            </span>
            <span className={cx('text-btn')}>{numberDisplay((post.reactions && post.reactions.dislikes) || '00')}</span>
          </button>
        </section>
      )}
    </>
  );
};

export default ActionsBar;
