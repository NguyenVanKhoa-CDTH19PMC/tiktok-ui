import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './CommentsTab.module.scss';

import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '~/services/userService';
import { useEffect, useState } from 'react';
import ReviewProfile from '~/components/ReviewProfile';
const cx = classNames.bind(style);

function CommentItem({ data }) {
  const [user, setUser] = useState();
  const fecthApi = async () => {
    const userData = await getUser(data.user.id);
    setUser(userData);
  };
  useEffect(() => {
    fecthApi();
  }, []);
  return (
    <div className={cx('comment-item-container')}>
      <div className={cx('comment-item')}>
        <ReviewProfile data={user}>
          <div className={cx('avatar-container')}>
            <Avatar size={40} className={cx('avatar')} src={user && user.image}></Avatar>
          </div>
        </ReviewProfile>

        <div className={cx('content')}>
          <ReviewProfile data={user}>
            <Link className={cx('fullname')}>{data.user.fullName}</Link>
          </ReviewProfile>

          <p className={cx('body')}>{data.body}</p>
          <div className={cx('sub-comment')}>
            <span className={cx('time')}>1d ago</span>
            <button className={cx('reply-button')}>Reply</button>
          </div>
        </div>
        <div className={cx('like-container')}>
          <div className={cx('more-button')}>
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
          <button className={cx('like-button')}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <span className={cx('like-count')}>{data.likes}</span>
        </div>
      </div>
      <Link className={cx('repply-container')}>
        View 0 replies <FontAwesomeIcon icon={faAngleDown} />
      </Link>
    </div>
  );
}

export default CommentItem;
