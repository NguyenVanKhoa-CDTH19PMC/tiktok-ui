import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faArrowRightFromBracket, faEllipsisV, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSquarePlus, faCircleQuestion, faUser, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';

import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import images from '~/assets/images';
import { Button } from '~/components/FormControls';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, InboxIconActive } from '~/components/Icons';
import Search from '../../../components/SearchForm';
import { languages } from '~/assets/langugesJson';
import { config } from '~/config';
import { useAuth } from '~/hooks/AuthContext';

import { useModals } from '~/hooks/ModalsContext';
import routes from '~/config/routes';
import Avatar from '~/components/Avatar';
import { Wrapper } from '~/components/Popper';
import { Image } from '~/components/Images';
import { useEffect, useState } from 'react';
const cx = classNames.bind(style);

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, authUser } = useAuth();
  const { handleOpenLoginModal, handleOpenLogoutModal } = useModals();
  const [inboxBarActive, setInboxBarActive] = useState('All activity');
  const [showNotifications, setShowNotifications] = useState(false);
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
  let LOGIN_MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      onClick: () => {
        if (authUser?.id) {
          navigate(routes.profile(authUser.id));
        } else {
          console.log('authUser.id is undefined');
        }
      },
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
      onClick: handleOpenLogoutModal,
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
          {isLoggedIn ? (
            <>
              <Button to={routes.upload} className={cx('upload-btn')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <div>
                <TippyHeadless
                  interactive
                  visible={showNotifications}
                  onClickOutside={() => setShowNotifications(false)}
                  render={() => (
                    <Wrapper className={cx('notifications-contianer')}>
                      <div className={cx('notif-header')}>
                        <h2 className={cx('notif-title')}>Notifications</h2>
                        <div className={cx('inbox-bar')}>
                          {['All activity', 'Likes', 'Comments', 'Mentions and tags', 'Followers'].map((item) => (
                            <div
                              key={item}
                              onClick={() => {
                                setInboxBarActive(item);
                              }}
                              className={cx('inbox-bar-item', { active: inboxBarActive === item })}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={cx('inbox-list')}>
                        <p className={cx('inbox-title')}>Previous</p>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                          <div key={item} className={cx('notif-item')}>
                            <div className={cx('notif-avatar')}>
                              <Avatar size={48} />
                            </div>
                            <div className={cx('notif-content')}>
                              <div className={cx('fullname')}>Name</div>
                              <p className={cx('action')}>
                                action
                                <span className={cx('notif-time')}>1day ago</span>
                              </p>
                              <div className={cx('notif-desc')}> Name: comment</div>
                            </div>
                            <div className={cx('preview')}>
                              <Image src={''} alt="avatar" width={42} height={56} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Wrapper>
                  )}
                >
                  <Tippy
                    disabled={showNotifications}
                    appendTo={document.body}
                    placement="bottom"
                    interactive
                    offset={[0, 10]}
                    content="Inbox"
                  >
                    <button
                      onClick={() => setShowNotifications((pre) => !pre)}
                      className={cx('inbox-bnt', 'action-btn')}
                    >
                      <span className={cx('badge')}>2</span>
                      {showNotifications === false ? <InboxIcon /> : <InboxIconActive />}
                    </button>
                  </Tippy>
                </TippyHeadless>
              </div>
            </>
          ) : (
            <>
              <Button onClick={handleOpenLoginModal} className={cx('login-btn')} primary>
                Log in
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              {authUser && (
                <Menu className={cx('actions-menu')} data={LOGIN_MENU_ITEMS}>
                  <div className={cx('current-account')}>
                    <Avatar size={32} alt="avatar" src={authUser?.image} />
                  </div>
                </Menu>
              )}
            </>
          )}
          {!isLoggedIn && (
            <Menu className={cx('actions-menu')} data={MENU_ITEMS}>
              <i className={cx('more-action')}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </i>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
