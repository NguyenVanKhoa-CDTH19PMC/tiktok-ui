import Button from '~/components/Button';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { getUser } from '~/services/userService';
import { useEffect, useRef, useState } from 'react';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import VideosTab from './Tabs/VideosTab';
import LikedTab from './Tabs/LikedTab';
const cx = classNames.bind(style);
function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const tabRef = useRef([]);
  const tagTabRef = useRef();
  const [tabActive, setTabActive] = useState(0);
  const [selectedFillter, setSelectedFillter] = useState(0);
  const fecthAPI = async () => {
    const result = await getUser(userId);
    setUser(result);
  };
  useEffect(() => {
    fecthAPI();
  }, []);

  useEffect(() => {
    const updateTagTab = (tab) => {
      tagTabRef.current.style.width = tab.getBoundingClientRect().width + 'px';
      tagTabRef.current.style.left =
        tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px';
    };
    tabRef.current.forEach((tab) => {
      tab.addEventListener('mouseenter', () => {
        updateTagTab(tab);
      });
    });
    tabRef.current.forEach((tab) => {
      tab.addEventListener('mouseleave', () => {
        updateTagTab(tabRef.current[tabActive]);
      });
    });
    return () => {
      tabRef.current.forEach((tab) => {
        tab?.removeEventListener('mouseenter', () => {
          updateTagTab(tab);
        });
      });
      tabRef.current.forEach((tab) => {
        tab?.removeEventListener('mouseleave', () => {
          updateTagTab(tabRef.current[tabActive]);
        });
      });
    };
  }, [tabActive]);
  const renderTabContent = () => {
    switch (tabActive) {
      case 0:
        return <VideosTab userId={userId} />;
      case 2:
        return <LikedTab user={user} />;
      default:
        return <div>Not found</div>;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('avatar')}>
          <Avatar alt="avatar" src={user.image} size={212} />
        </div>
        <div className={cx('information')}>
          <div className={cx('identi')}>
            <h1 className={cx('username')}>{user.username}</h1>
            <h2 className={cx('fullname')}>
              {' '}
              {`${user.firstName || ''} ${user.maidenName || ''} ${user.lastName || ''}`}{' '}
            </h2>
          </div>
          <div className={cx('buttons-panel')}>
            <Button medium primary>
              Follow
            </Button>
            <Button medium>Message</Button>
            <Button medium>{`>`}</Button>
            <Button medium>...</Button>
          </div>
          <div className={cx('count-infor')}>
            <div className={cx('count-infor-item')}>
              <strong>{user.age}</strong> Following{' '}
            </div>
            <div className={cx('count-infor-item')}>
              <strong>{user.age}</strong> Followers{' '}
            </div>
            <div className={cx('count-infor-item')}>
              <strong>{user.age}</strong> Likes{' '}
            </div>
          </div>
          <div className={cx('bio')}> {'Email: ' + user.email}</div>
        </div>
      </div>
      <div className={cx('wall-page-container')}>
        <div className={cx('tabs-container')}>
          <div className={cx('tab-list')}>
            <div
              ref={(el) => (tabRef.current[0] = el)}
              onClick={() => setTabActive(0)}
              className={cx('tab-item', { active: tabActive == 0 })}
            >
              <i className={cx('tab-icon')}>
                <FontAwesomeIcon icon={faList} />
              </i>
              <span className={cx('tab-title')}>Videos</span>
            </div>
            <div
              ref={(el) => (tabRef.current[1] = el)}
              onClick={() => setTabActive(1)}
              className={cx('tab-item', { active: tabActive == 1 })}
            >
              <i className={cx('tab-icon')}>
                <FontAwesomeIcon icon={faRepeat} />
              </i>
              <span className={cx('tab-title')}>Reposts</span>
            </div>
            <div
              ref={(el) => (tabRef.current[2] = el)}
              onClick={() => setTabActive(2)}
              className={cx('tab-item', { active: tabActive == 2 })}
            >
              <i className={cx('tab-icon')}>
                <FontAwesomeIcon icon={faHeart} />
              </i>
              <span className={cx('tab-title')}>Liked</span>
            </div>
            <div ref={tagTabRef} className={cx('tab-active-tag')}></div>
          </div>
          {tabActive == 0 && (
            <div className={cx('filter-container')}>
              <div className={cx('select')}>
                <div onClick={() => setSelectedFillter(0)} className={cx('option', { selected: selectedFillter == 0 })}>
                  Latest
                </div>
                <div onClick={() => setSelectedFillter(1)} className={cx('option', { selected: selectedFillter == 1 })}>
                  Popular
                </div>
                <div onClick={() => setSelectedFillter(2)} className={cx('option', { selected: selectedFillter == 2 })}>
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
