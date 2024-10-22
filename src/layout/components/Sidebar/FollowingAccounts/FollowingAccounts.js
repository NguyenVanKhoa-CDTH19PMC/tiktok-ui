import classNames from 'classnames/bind';
import style from './FollowingAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getFollowingAccounts } from '~/services/userService';
import Loading from '~/components/Loading';

const cx = classNames.bind(style);

function FollowingAccout({ ...props }) {
  const limmit = 5;
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(users);
  const fetchApi = async () => {
    setLoading(true);
    const usersData = await getFollowingAccounts({ limit: limmit, skip: (page - 1) * limmit });
    setUsers((pre) => [...pre, ...usersData.users]);
    setLoading(false);
  };
  useEffect(() => {
    fetchApi();
  }, [page]);
  const moreUser = () => {
    setPage((pre) => pre + 1);
  };
  return (
    <div className={cx('wrapper', props.className)}>
      <h2 className={cx('title')}>Following accounts</h2>
      <ul className={cx('account-list')}>
        {users.map((item, index) => {
          return (
            <li key={index} className={cx('account-item')}>
              <AccountItem data={item} />
            </li>
          );
        })}
        {loading && (
          <li>
            <Loading size={10} />
          </li>
        )}
      </ul>
      <button onClick={() => moreUser()} className={cx('more-btn')}>
        See more
      </button>
    </div>
  );
}

export default FollowingAccout;
