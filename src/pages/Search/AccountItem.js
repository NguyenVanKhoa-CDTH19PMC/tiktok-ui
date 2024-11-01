import Avatar from '~/components/Avatar';
import style from './Search.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function AccountItem({ data }) {
  return (
    <div className={cx('search-account-item')}>
      <div className={cx('avatar')}>
        <Avatar src={data.image} size={60} />
      </div>
      <div className={cx('account-information')}>
        <p className={cx('username')}>{data?.username}</p>
        <p className={cx('fullname')}>
          {data?.lastName}
          {` · `}
          <p className={cx('follow-count')}>{data?.age}</p>
          {` Followers`}
        </p>
        <p className={cx('discription')}>{data?.email}</p>
      </div>
    </div>
  );
}

export default AccountItem;
