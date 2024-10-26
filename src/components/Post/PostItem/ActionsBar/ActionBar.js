import PropTypes from 'prop-types';
import style from './ActionsBar.module.scss';
import classNames from 'classnames/bind';
import { BookMarkIcon, CommentIcon, HeartIcon, PlusIcon, ShareIcon } from '~/components/Icons';
import { useEffect, useState } from 'react';
import { getCommentByPost } from '~/services/commentServices';
import { numberDisplay } from '~/utils/numberDisplay';
import ReviewProfile from '~/components/ReviewProfile';
import { Link } from 'react-router-dom';
import { config } from '~/config';
import routes from '~/config/routes';
import Avatar from '~/components/Avatar';
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
      <section className={cx('actions-bar')}>
        <ReviewProfile data={author}>
          <div className={cx('avatar-action')}>
            <Link to={routes.profile(author.id)}>
              <Avatar size={48} src={author.image} alt="avatr" />
            </Link>

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
          <span className={cx('text-btn')}>{numberDisplay(post.reactions?.likes || '00')}</span>
        </button>
        <Link to={config.routes.post(post.id)}>
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
          <span className={cx('text-btn')}>{numberDisplay(post.reactions?.dislikes || '00')}</span>
        </button>
        <button className={cx('action-btn')}>
          <span className={cx('icon-btn')}>
            <i className={cx('icon')}>
              <ShareIcon />
            </i>
          </span>
          <span className={cx('text-btn')}>{numberDisplay(post.reactions?.dislikes || '00')}</span>
        </button>
      </section>
    </>
  );
};

export default ActionsBar;
