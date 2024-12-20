import { useEffect, useState } from 'react';
import style from './Search.module.scss';
import classNames from 'classnames/bind';
import TabNavigator from '~/components/TabNavigator/TabNavigator';
import PostThumbnail from '../Profile/components/PostThumbnail';
import { getPosts, searchPosts } from '~/services/postSevices';
import { search } from '~/services/seacrhService';
import AccountItem from './AccountItem';
const cx = classNames.bind(style);

function Search() {
  document.title = `Find 's' on TikTok | TikTok Search`;

  const [tabActive, setTabActive] = useState(0);
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();

  const fetchApi = async () => {
    const postsResult = await searchPosts({ limit: 10, skip: 0, q: 'jo' });
    setPosts(postsResult.posts);
    console.log(postsResult);
  };
  const fetchUsers = async () => {
    const usersResult = await search('jo');
    setUsers(usersResult.users);
    console.log(usersResult);
  };

  useEffect(() => {
    fetchApi();
    fetchUsers();
  }, []);
  const renderTabContent = () => {
    switch (tabActive) {
      case 0:
        return (
          <div className={cx('top-tab-content')}>
            <section className={cx('section-tab-content')}>
              <div className={cx('seaction-tab-title')}>Videos</div>
              <div className={cx('list-video-result')}>
                {posts?.map((post) => (
                  <div key={post.id} className={cx('video-result-item')}>
                    <PostThumbnail extendAuthor post={post} />
                  </div>
                ))}
              </div>
            </section>
            <section className="section-tab-content">
              <div className={cx('seaction-tab-title')}>Users</div>
              <div className={cx('list-user-result')}>
                {users?.map((user) => (
                  <div key={user.id} className={cx('user-result-item')}>
                    <AccountItem data={user} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 1:
        return (
          <div className={cx('top-tab-content')}>
            <section className="section-tab-content">
              <div className={cx('seaction-tab-title')}>Users</div>
              <div className={cx('list-user-result')}>
                {users.map((user) => (
                  <div key={user.id} className={cx('user-result-item')}>
                    {' '}
                    <AccountItem data={user} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 2:
        return (
          <div className={cx('top-tab-content')}>
            <section className={cx('section-tab-content')}>
              <div className={cx('seaction-tab-title')}>Videos</div>
              <div className={cx('list-video-result')}>
                {posts?.map((post) => (
                  <div key={post.id} className={cx('video-result-item')}>
                    <PostThumbnail extendAuthor post={post} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      default:
        return <div>Developing</div>;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('tab-navigater')}>
          <TabNavigator
            data={[
              { id: 0, title: 'Top' },
              { id: 1, title: 'Users' },
              { id: 2, title: 'Videos' },
              { id: 3, title: 'LIVE' },
            ]}
            onSelectTab={(tab) => setTabActive(tab)}
          />
        </div>
        <div className={cx('tab-content')}>{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Search;
