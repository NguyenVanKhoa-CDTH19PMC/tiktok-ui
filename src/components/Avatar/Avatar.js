import PropTypes from 'prop-types';
import style from './Avatar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Avatar({ src, size = 40, ...prop }) {
  const style = { width: size + 'px', height: size + 'px' };
  return (
    <div className={cx('wrapper')} style={style}>
      <img src={src || `https://placehold.co/${size}x${size}/fe2c54/white`} />
    </div>
  );
}
Avatar.prototype = {
  src: PropTypes.string,
  size: PropTypes.number,
};
export default Avatar;
