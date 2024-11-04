import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Images.module.scss';
const cx = classNames.bind(styles);
export const Image = forwardRef(({ src = '', alt, className, width, height, size = 30, ...props }, ref) => {
  const style = { width: width || size + 'px', height: height || size + 'px' };

  const classes = cx('wrapper', className);
  return (
    <img
      style={style}
      className={classes}
      ref={ref}
      src={src || `https://placehold.co/${width || size}x${height || size}/fe2c54/white`}
      alt={alt}
      {...props}
    />
  );
});
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
