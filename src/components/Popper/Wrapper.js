import PropTypes from 'prop-types';
import style from './Popper.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Wrapper({ className, children, dark }) {
  return <div className={cx('wrapper', className, { dark: dark })}>{children}</div>;
}
Wrapper.prototype = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool,
};
export default Wrapper;
