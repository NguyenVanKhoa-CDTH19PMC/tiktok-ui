import classNames from 'classnames/bind';
import style from './FollowingAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getFollowingAccounts } from '~/services/userService';

const cx = classNames.bind(style);

function FollowingAccout({ ...props }) {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const fetchApi = async () => {
      const result = await getFollowingAccounts();
      setData(result.users);
    };
    fetchApi();
  }, []);
  return (
    <div className={cx('wrapper', props.className)}>
      <h2 className={cx('title')}>Following accounts</h2>
      <ul className={cx('account-list')}>
        {data.map((item, index) => {
          return (
            <li key={index} className={cx('account-item')}>
              <AccountItem data={item} />
            </li>
          );
        })}
      </ul>
      <button className={cx('more-btn')}>See more</button>
    </div>
  );
}

export default FollowingAccout;
