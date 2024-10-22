import PropTypes from 'prop-types';
import style from './Popper.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Wrapper({ children, dark }) {
  return <div className={cx('wrapper', { dark: dark })}>{children}</div>;
}
Wrapper.prototype = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
};
export default Wrapper;
