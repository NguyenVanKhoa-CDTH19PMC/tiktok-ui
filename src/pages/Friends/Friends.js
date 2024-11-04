import UserThumbnail from '~/components/UserThumbnail';
import style from './Friends.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getFollowingAccounts, getUser } from '~/services/userService';

const cx = classNames.bind(style);
function Friends() {
  const [users, setUsers] = useState();
  const fetchUsers = async () => {
    const usersData = await getFollowingAccounts();
    setUsers(usersData.users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('list-container')}>
        {users?.map((user) => (
          <div key={user.id}>
            <UserThumbnail data={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
