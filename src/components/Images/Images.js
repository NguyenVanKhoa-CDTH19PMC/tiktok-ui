import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Images.module.scss';
const cx = classNames.bind(styles);
export const Image = forwardRef(
  ({ src = '', alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');
    const handleError = () => {
      setFallback('https://placehold.co/40x40/fe2c54/white');
    };

    const classes = cx('wrapper', className);
    return <img className={classes} ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError} />;
  },
);
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
