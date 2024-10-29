import PropTypes from 'prop-types';
import images from '~/assets/images';
import style from './StudioLayout.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import { Link, NavLink } from 'react-router-dom';
import routes from '~/config/routes';
import { HomeActiveIcon, HomeIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faChartLine, faList } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faCommentDots, faLightbulb } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(style);

function StudioLayout({ children }) {
  const NAV_MENU = [
    { icon: <HomeIcon />, title: 'Home', route: routes.upload },
    { icon: <FontAwesomeIcon icon={faList} />, title: 'Posts', route: routes.home },
    { icon: <FontAwesomeIcon icon={faCommentDots} />, title: 'Comments', route: routes.home },
    { icon: <FontAwesomeIcon icon={faChartLine} />, title: 'Analytics', route: routes.home },
    { icon: <FontAwesomeIcon icon={faLightbulb} />, title: 'Inspirations', route: routes.home },
    { icon: <FontAwesomeIcon icon={faChalkboardTeacher} />, title: 'Creator Academy', route: routes.home },
    { icon: <FontAwesomeIcon icon={faCircleQuestion} />, title: 'Feddback', route: routes.home },
  ];
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="" />
          <div className={cx('low-logo-container')}>
            <span className={cx('low-logo')}>Studio</span>
          </div>
        </div>
        <div className={cx('avatar')}>
          <Avatar size={32} src={''} />
        </div>
      </header>
      <main className={cx('main')}>
        <aside className={cx('sidebar')}>
          <NavLink to={routes.upload}>
            {({ isActive }) => (
              <Button primary disabled={isActive} large className={cx('upload-button')}>
                Upload
              </Button>
            )}
          </NavLink>
          <nav className={cx('nav-list')}>
            {NAV_MENU.map((nav, index) => (
              <NavLink className={cx('nav-item-container')} key={index} to={nav.route}>
                {({ isActive }) => (
                  <div className={cx('nav-item', { 'home-nav': nav.title === 'Home', active: isActive })}>
                    <div className={cx('nav-icon')}>{nav.icon}</div>
                    <span className={cx('nav-title')}>{nav.title}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
          <footer className={cx('fooder')}>
            <div className={cx('back-to-tiktok-container')}>
              <Link to={routes.home} className={cx('back-to-tiktok-link')}>
                Back to Tiktok
              </Link>
            </div>
            <div className={cx('fooder-list')}>
              <div className={cx('fooder-item')}>Terms of Service</div>
              <div className={cx('fooder-item')}>Privacy Policy</div>
              <div className={cx('fooder-item')}>Copyright © 2024 TikTok</div>
            </div>
          </footer>
        </aside>
        <div className={cx('content')}></div>
        {children}
      </main>
    </div>
  );
}

export default StudioLayout;
