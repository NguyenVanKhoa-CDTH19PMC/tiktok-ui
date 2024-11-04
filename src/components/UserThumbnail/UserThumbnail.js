import PropTypes from 'prop-types';
import style from './UserThumbnail.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { videosDemo } from '~/assets/videos';
import { Button } from '../FormControls';
import Avatar from '../Avatar';
const cx = classNames.bind(style);
function UserThumbnail({ data }) {
  const videoDemo = useRef(videosDemo[Math.floor(Math.random() * 4)]);
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
    // const fetchAuthor = async () => {
    //   const result = await getUser(post.userId);
    //   setAuthor(result);
    // };
    // fetchAuthor();
  }, []);
  return (
    <Link className={cx('link-container')} to={'routes.post(post.id)'}>
      <div ref={wrapperRef} className={cx('wrapper')}>
        <div className={cx('video')}>
          <video muted ref={videoRef} src={videoDemo.current}></video>
        </div>
        <div className={cx('user-infomation-container')}>
          <div className={cx('avatar')}>
            <Avatar src={data.image} size={48}></Avatar>
          </div>

          <div className={cx('fullname')}>{data.lastName}</div>
          <div className={cx('username')}>{data.username}</div>
          <Button className={cx('follow-button')} primary>
            Follow
          </Button>
        </div>
      </div>
    </Link>
  );
}
UserThumbnail.prototype = {};
export default UserThumbnail;
