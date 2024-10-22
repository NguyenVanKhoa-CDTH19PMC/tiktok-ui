import PropTypes from 'prop-types';
import style from './Avatar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Avatar({ src = 'https://placehold.co/48x48/fe2c54/white', size = 40, ...prop }) {
  const style = { width: size + 'px', height: size + 'px' };
  return (
    <div className={cx('wrapper')} style={style}>
      <img src={src} />
    </div>
  );
}
Avatar.prototype = {
  src: PropTypes.string,
  size: PropTypes.number,
};
export default Avatar;
