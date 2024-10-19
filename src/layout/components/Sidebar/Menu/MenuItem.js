import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Menu.module.scss';
import classNames from 'classnames/bind';
import { HomeActiveIcon, HomeIcon } from '~/components/Icons';
const cx = classNames.bind(style);
function MenuItem({ title, icon, activeIcon, to }) {
  return (
    <NavLink to={to} className={cx('menu-item')}>
      {({ isActive }) => (
        <>
          <span className={cx('icon-item', { active: isActive })}>{!isActive ? icon : activeIcon}</span>
          <span className={cx('title-item', { active: isActive })}>{title}</span>
        </>
      )}
    </NavLink>
    /* <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          {({ isActive }) => (
            <>
              {isActive ? <UserArowActiveIcon /> : <a />}
              <span style={{ marginLeft: '8px' }}>Trang chủ</span>
            </>
          )}
        </NavLink> */
  );
}
MenuItem.prototype = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
export default MenuItem;
