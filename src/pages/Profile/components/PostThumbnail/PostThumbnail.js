import classNames from 'classnames/bind';
import style from './PostThumbnail.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlay } from '@fortawesome/free-solid-svg-icons';
import { videosDemo } from '~/assets/videos';
import { useEffect, useRef, useState } from 'react';
import { numberDisplay } from '~/utils/numberDisplay';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import Avatar from '~/components/Avatar';
import { getUser } from '~/services/userService';

const cx = classNames.bind(style);
function PostThumbnail({ post }) {
  const [author, setAuthor] = useState();
  const videoDemo = useRef(videosDemo[Math.floor(Math.random() * 4)]);
  const isImage = false;
  const pinned = false;
  const wrapperRef = useRef();
  const videoRef = useRef();
  useEffect(() => {
    const play = () => {
      videoRef.current.play();
    };
    const pause = () => {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    };
    wrapperRef.current.addEventListener('mouseenter', () => play());
    wrapperRef.current.addEventListener('mouseleave', () => pause());
    return () => {
      wrapperRef.current?.removeEventListener('mouseenter', () => play());
      wrapperRef.current?.removeEventListener('mouseleave', () => pause());
    };
  }, []);
  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await getUser(post.userId);
      setAuthor(result);
    };
    fetchAuthor();
  }, []);
  return (
    <Link className={cx('link-container')} to={routes.post(post.id)}>
      <div ref={wrapperRef} className={cx('wrapper')}>
        <div className={cx('video')}>
          <video muted ref={videoRef} src={videoDemo.current}></video>
        </div>
        <div className={cx('header')}>
          <div className={cx('pinned', { show: pinned })}>Pinned</div>
          <div className={cx('isImage', { show: isImage })}>
            <FontAwesomeIcon icon={faImage} />
          </div>
        </div>
        <div className={cx('footer')}>
          <div className={cx('view-count')}>
            <div className={cx('view-icon')}>
              <FontAwesomeIcon icon={faPlay} /> {numberDisplay(post.views)}
            </div>
          </div>
        </div>
      </div>
      <div className={cx('post-information')}>
        <p className={cx('description')}>{post.title}</p>
        <div className={cx('fooder-video-result-item')}>
          <div className={cx('author-information')}>
            <div className={cx('avatar')}>
              <Avatar size={24} src={author?.image} />
            </div>
            <p className={cx('username')}>{author?.username}</p>
          </div>
          <div className={cx('post-time')}>1d ago</div>
        </div>
      </div>
    </Link>
  );
}
PostThumbnail.prototype = {
  post: PropTypes.object.isRequired,
};
export default PostThumbnail;
