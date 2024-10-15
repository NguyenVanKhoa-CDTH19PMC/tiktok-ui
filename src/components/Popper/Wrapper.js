import PropTypes from 'prop-types';
import style from './Popper.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Wrapper({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}
Wrapper.prototype = {
  children: PropTypes.node.isRequired,
};
export default Wrapper;
