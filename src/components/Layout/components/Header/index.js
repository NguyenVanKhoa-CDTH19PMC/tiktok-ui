import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faA,
  faArrowRightFromBracket,
  faCircleXmark,
  faEllipsisV,
  faGear,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSquarePlus, faCircleQuestion, faUser, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import Headlessippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, InboxIcon, SearchIcon } from '~/components/Icons';
import { Image } from '~/components/Images';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const cx = classNames.bind(style);
function Header() {
  const searchRef = useRef();
  const [serchWidth, setserchWidth] = useState(0);
  console.log(serchWidth);
  useLayoutEffect(() => {
    // Hàm để cập nhật chiều rộng của khung kết quả
    const updateWidth = () => {
      if (searchRef.current) {
        const newWidth = searchRef.current.offsetWidth; // lấy chiều rộng của ô nhập
        setserchWidth(newWidth);
      }
    };

    // Gọi hàm updateWidth lần đầu tiên để thiết lập chiều rộng
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);
  const currentUser = true;
  const data = [1];
  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faSquarePlus} />,
      title: 'Creator tools',
      to: '/',
    },
    {
      icon: <FontAwesomeIcon icon={faA} />,
      title: 'English',
      children: {
        title: 'Language',
        data: [{ title: 'Vietnames' }],
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: 'Feedback and help',
    },
    {
      icon: <FontAwesomeIcon icon={faMoon} />,
      title: 'Dark mode',
    },
  ];
  const LOGIN_MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
    },
    {
      icon: <FontAwesomeIcon icon={faCircleDot} />,
      title: 'Get Coins',
    },
    ...MENU_ITEMS.slice(0, 1),
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
    },
    ...MENU_ITEMS.slice(1),
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Log out',
      separate: true,
    },
  ];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="logo" />
        </div>
        <Headlessippy
          appendTo={document.body}
          interactive
          visible
          render={(attas) => (
            <PopperWrapper>
              <div tabIndex="-1" style={{ width: serchWidth }} className={cx('search-result')}>
                <div className={cx('search-title')}>Account</div>
                <ul className={cx('search-list')}>
                  <li className={cx('search-item')}>
                    {data.map((index) => (
                      <AccountItem key={index} />
                    ))}
                  </li>
                </ul>
              </div>
            </PopperWrapper>
          )}
        >
          <div ref={searchRef} className={cx('search')}>
            <input type="text" placeholder="Search" />
            <div className={cx('clean')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
            <button className={cx('search-btn', 'action-btn')}>
              <SearchIcon />
            </button>
          </div>
        </Headlessippy>
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button className={cx('upload-btn')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Tippy placement="bottom" interactive offset={[0, 10]} content="Messages">
                <button className={cx('message-btn', 'action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy placement="bottom" interactive offset={[0, 10]} content="Inbox">
                <button className={cx('inbox-bnt', 'action-btn')}>
                  <span className={cx('badge')}>2</span>
                  <InboxIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button className={cx('login-btn')} primary>
                Log in
              </Button>
            </>
          )}
          <Menu data={currentUser ? LOGIN_MENU_ITEMS : MENU_ITEMS}>
            {currentUser ? (
              <Image alt="avatar" src="https://placehold.co/32x32/fe2c54/white" className={cx('current-account')} />
            ) : (
              <i className={cx('more-action')}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </i>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
