import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faArrowRightFromBracket, faEllipsisV, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSquarePlus, faCircleQuestion, faUser, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, InboxIcon } from '~/components/Icons';
import { Image } from '~/components/Images';
import Search from '../../../components/SearchForm';
import { languages } from '~/assets/langugesJson';
import { config } from '~/config';
const cx = classNames.bind(style);

function Header() {
  const currentUser = false;
  // const currentUser = JSON.parse(process.env.REACT_APP_USER_CURENT);

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
        data: languages,
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
        <Link to={config.routes.home} className={cx('logo')}>
          <img src={images.logo} alt="logo" />
        </Link>
        <Search />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button className={cx('upload-btn')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Tippy appendTo={document.body} placement="bottom" interactive offset={[0, 10]} content="Messages">
                <button className={cx('message-btn', 'action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy appendTo={document.body} placement="bottom" interactive offset={[0, 10]} content="Inbox">
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
          <Menu className={cx('actions-menu')} data={currentUser ? LOGIN_MENU_ITEMS : MENU_ITEMS}>
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
