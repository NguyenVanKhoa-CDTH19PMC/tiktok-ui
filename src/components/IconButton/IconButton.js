import PropTypes from 'prop-types';
import style from './IconButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function IconButton({ icon, onclick }) {
  return (
    <button onclick={onclick} className={cx('wrapper')}>
      {icon}
    </button>
  );
}
IconButton.prototype = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
export default IconButton;