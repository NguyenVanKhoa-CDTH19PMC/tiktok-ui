import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import style from './ReviewProfile.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../FormControls';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import { numberDisplay } from '~/utils/numberDisplay';
import { useState } from 'react';
const cx = classNames.bind(style);
function ReviewProfile({ children, data }) {
  return (
    <HeadlessTippy
      appendTo={document.body}
      interactive
      offset={[0, 20]}
      delay={[700, 700]}
      placement="bottom-start"
      render={(attas) => (
        <PopperWrapper>
          <div className={cx('wrapper')}>
            <div className={cx('header')}>
              <Avatar size={44} src={data?.image} className={cx('avatar')} />
              <Button className={cx('follow-btn')} outline>
                Follow
              </Button>
            </div>
            <Link className={cx('username')}>
              <p> {data?.username}</p>
            </Link>
            <p className={cx('name')}>{`${data?.firstName || ''} ${data?.maidenName || ''} ${data?.lastName || ''}`}</p>
            <p className={cx('user-stat')}>
              <span className={cx('stat-item')}>
                <strong>{numberDisplay(data?.id)}</strong>Followers
              </span>
              <span className={cx('stat-item')}>
                <strong> {numberDisplay(data?.id)}</strong>Likes
              </span>
            </p>
            <p className={cx('bio')}> {data?.email}</p>
          </div>
        </PopperWrapper>
      )}
    >
      {children}
    </HeadlessTippy>
  );
}
ReviewProfile.prototype = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};
export default ReviewProfile;
