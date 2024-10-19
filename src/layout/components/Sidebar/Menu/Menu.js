import PropTypes from 'prop-types';
import style from './Menu.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Menu({ children }) {
  return <nav className={cx('wrapper')}>{children}</nav>;
}
Menu.prototype = {
  children: PropTypes.node.isRequired,
};
export default Menu;
