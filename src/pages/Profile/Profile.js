import { Button } from '~/components/FormControls';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { getUser } from '~/services/userService';
import { useEffect, useRef, useState } from 'react';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faGear, faList, faRepeat, faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import VideosTab from './Tabs/VideosTab';
import LikedTab from './Tabs/LikedTab';
import FavoritesTab from './Tabs/FavoritesTab/FavoritesTab';
import { useAuth } from '~/hooks/AuthContext';
import { useModals } from '~/hooks/ModalsContext';
import EditProfileModal from '~/components/Modals/EditProfileModal/EditProfileModal';
import TabNavigator from '~/components/TabNavigator/TabNavigator';
import { post } from '~/utils/httpRequest';
const cx = classNames.bind(style);
function Profile() {
  const { isLoggedIn, authUser } = useAuth();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [tabActive, setTabActive] = useState(0);
  const [selectedFillter, setSelectedFillter] = useState(0);
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);
  const [sortByVideoTab, setSortByVideoTab] = useState('id');
  const [orderVideoTab, setOrderVideoTab] = useState('desc');

  const TABS = [
    {
      id: 0,
      icon: <FontAwesomeIcon icon={faList} />,
      title: 'Videos',
    },
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faRepeat} />,
      title: 'Reposts',
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faHeart} />,
      title: 'Liked',
    },
  ];
  const AUTH_TABS = [
    ...TABS.slice(0, 2),
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faBookmark} />,
      title: 'Favorites',
    },
    TABS[2],
  ];

  const fecthAPI = async () => {
    const result = await getUser(userId);
    setUser(result);
    document.title = `${result.lastName} (@${result.username}) | TikTok`;
  };
  useEffect(() => {
    fecthAPI();
  }, [userId]);
  const renderTabContent = () => {
    switch (tabActive) {
      case 0:
        return (
          <div key={sortByVideoTab + orderVideoTab}>
            <VideosTab userId={userId} sortBy={sortByVideoTab} order={orderVideoTab} />
          </div>
        );
      case 2:
        return <LikedTab user={user} />;
      case 3:
        return <FavoritesTab />;
      default:
        return <div>Not found</div>;
    }
  };
  return (
    <div key={userId} className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('avatar')}>
          <Avatar alt="avatar" src={user.image} size={212} />
        </div>
        <div className={cx('information')}>
          <div className={cx('identi')}>
            <h1 className={cx('username')}>{user.username}</h1>
            <h2 className={cx('fullname')}>
              {`${user.firstName || ''} ${user.maidenName || ''} ${user.lastName || ''}`}{' '}
            </h2>
          </div>
          <div className={cx('buttons-panel')}>
            {authUser?.id == userId ? (
              <>
                <Button onClick={() => setEditProfileModalIsOpen(true)} medium primary>
                  Edit profile
                </Button>
                <EditProfileModal
                  modalIsOpen={editProfileModalIsOpen}
                  handleCloseModal={() => setEditProfileModalIsOpen(false)}
                ></EditProfileModal>
                <Button secondary medium>
                  Promote post
                </Button>
                <Button icon secondary medium>
                  <FontAwesomeIcon icon={faGear} />
                </Button>
                <Button icon secondary medium>
                  <FontAwesomeIcon icon={faShare} />
                </Button>
              </>
            ) : (
              <>
                <Button medium primary>
                  Follow
                </Button>
                <Button secondary medium>
                  Message
                </Button>
                <Button icon secondary medium>
                  <FontAwesomeIcon icon={faShare} />
                </Button>
                <Button icon secondary medium>
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              </>
            )}
          </div>
          <div className={cx('count-infor')}>
            <div className={cx('count-infor-item')}>
              <strong>{user.age}</strong> Following
            </div>
            <div className={cx('count-infor-item')}>
              <strong>{user.age}</strong> Followers
            </div>
            <div className={cx('count-infor-item')}>
              <strong>{user.age}</strong> Likes
            </div>
          </div>
          <div className={cx('bio')}> {'Email: ' + user.email}</div>
        </div>
      </div>
      <div className={cx('wall-page-container')}>
        <div className={cx('tabs-container')}>
          <TabNavigator data={TABS} onSelectTab={(tabSelected) => setTabActive(tabSelected)} />

          {tabActive == 0 && (
            <div className={cx('filter-container')}>
              <div className={cx('select')}>
                <div
                  onClick={() => {
                    setOrderVideoTab('desc');
                    setSortByVideoTab('id');
                    setSelectedFillter(0);
                  }}
                  className={cx('option', { selected: selectedFillter == 0 })}
                >
                  Latest
                </div>
                <div
                  onClick={() => {
                    setOrderVideoTab('desc');
                    setSortByVideoTab('views');
                    setSelectedFillter(1);
                  }}
                  className={cx('option', { selected: selectedFillter == 1 })}
                >
                  Popular
                </div>
                <div
                  onClick={() => {
                    setOrderVideoTab('asc');
                    setSortByVideoTab('id');
                    setSelectedFillter(2);
                  }}
                  className={cx('option', { selected: selectedFillter == 2 })}
                >
                  Oldest
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cx('tab-content')}>{renderTabContent()}</div>
    </div>
  );
}

export default Profile;
