import {
  CompassActiveIcon,
  CompassIcon,
  HomeActiveIcon,
  HomeIcon,
  LiveActiveIcon,
  LiveIcon,
  UserArowActiveIcon,
  UserArowIcon,
  UserGroupActiveIcon,
  UserGroupIcon,
  UserIcon,
} from '~/components/Icons';
import style from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import routes from '~/config/routes';
import { Image } from '~/components/Images';
import Button from '~/components/Button';
import Fooder from './Fooder';
import FollowingAccounts from './FollowingAccounts';
import { useLayoutEffect, useRef } from 'react';
const cx = classNames.bind(style);
function Sidebar() {
  const currentUser = true;

  // const currentUser = JSON.parse(process.env.REACT_APP_USER_CURENT);
  const MENU_ITEMS = [
    {
      title: 'For You',
      icon: <HomeIcon />,
      activeIcon: <HomeActiveIcon />,
      to: routes.home,
    },
    {
      title: 'Explore',
      icon: <CompassIcon />,
      activeIcon: <CompassActiveIcon />,
      to: routes.explore,
    },
    {
      title: 'Following',
      icon: <UserArowIcon />,
      activeIcon: <UserArowActiveIcon />,
      to: routes.following,
    },

    {
      title: 'LIVE',
      icon: <LiveIcon />,
      activeIcon: <LiveActiveIcon />,
      to: routes.live,
    },
    {
      title: 'Profile',
      icon: <UserIcon />,
      activeIcon: <UserIcon />,
      to: routes.profile,
    },
  ];
  const LOGIN_MENU_ITEMS = [
    ...MENU_ITEMS.slice(0, 3),
    {
      title: 'Friends',
      icon: <UserGroupIcon />,
      activeIcon: <UserGroupActiveIcon />,
      to: routes.friends,
    },
    ...MENU_ITEMS.slice(3, 4),

    {
      title: 'Profile',
      icon: <Image fallback="https://placehold.co/40x40/fe2c54/white" src="" alt="" />,
      activeIcon: <Image fallback="https://placehold.co/40x40/fe2c54/white" src="" alt="" />,
      to: routes.profile,
    },
  ];
  const menuItem = currentUser ? LOGIN_MENU_ITEMS : MENU_ITEMS;
  //////////////
  const contentRef = useRef();
  const thubRef = useRef();
  const scrollbarRef = useRef();
  let content;
  let thumb;
  let scrollbar;

  function updateThumbSize() {
    const ratio = content.clientHeight / content.scrollHeight;
    thumb.style.height = `${ratio * 100}%`;
  }

  useLayoutEffect(() => {
    content = contentRef.current;
    thumb = thubRef.current;
    scrollbar = scrollbarRef.current;
    content.addEventListener('scroll', () => {
      const scrollRatio = content.scrollTop / (content.scrollHeight - content.clientHeight);
      thumb.style.top = `${scrollRatio * (scrollbar.clientHeight - thumb.offsetHeight)}px`;
    });

    // // Kéo thả thumb để cuộn nội dung
    // let isDragging = false;
    // let startY, startScrollTop;

    // thumb.addEventListener('mousedown', (e) => {
    //   isDragging = true;
    //   startY = e.clientY;
    //   startScrollTop = content.scrollTop;
    //   document.body.style.userSelect = 'none'; // Vô hiệu hóa chọn văn bản khi kéo
    // });

    // document.addEventListener('mousemove', (e) => {
    //   if (!isDragging) return;
    //   const deltaY = e.clientY - startY;
    //   const scrollRatio = deltaY / scrollbar.clientHeight;
    //   content.scrollTop = startScrollTop + scrollRatio * content.scrollHeight;
    // });

    // document.addEventListener('mouseup', () => {
    //   isDragging = false;
    //   document.body.style.userSelect = ''; // Khôi phục chọn văn bản
    // });

    // resize thumb when reload web
    updateThumbSize();
    window.addEventListener('resize', updateThumbSize);
  }, []);

  //////////////
  return (
    <div className={cx('wrapper')}>
      <div ref={contentRef} className={cx('content')}>
        <Menu>
          {menuItem.map((item, index) => (
            <MenuItem key={index} to={item.to} title={item.title} icon={item.icon} activeIcon={item.activeIcon} />
          ))}
        </Menu>
        {currentUser ? (
          <>
            <FollowingAccounts className={cx('separate')} />
          </>
        ) : (
          <div className={cx('login-hint', 'separate')}>
            <p className={cx('login-tip')}>Log in to follow creators, like videos, and view comments.</p>
            <Button className={cx('login-btn')} outline large>
              Log In
            </Button>
          </div>
        )}
        <Fooder className={cx('separate')} />
      </div>
      <div ref={scrollbarRef} className={cx('custom-scrollbar')}>
        <div ref={thubRef} className={cx('thumb')}></div>
      </div>
    </div>
  );
}

export default Sidebar;
