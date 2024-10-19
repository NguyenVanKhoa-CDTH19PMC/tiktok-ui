import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import { Image } from '~/components/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function AccountItem({ data }) {
  return (
    <div className={cx('wrapper')}>
      <Link to={`/${data.username}`} className={cx('account-item')}>
        <div className={cx('avt')}>
          <Image fallback="https://placehold.co/40x40/fe2c54/white" src={data.image} alt="" />
        </div>

        <div className={cx('info')}>
          <div className={cx('name-container')}>
            <h4 className={cx('name')}>{`${data.firstName} ${data.maidenName} ${data.lastname}`}</h4>
            {data.role && (
              <span className={cx('check')}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
            )}
          </div>
          <span className={cx('username')}>{data.username}</span>
        </div>
      </Link>
    </div>
  );
}
AccountItem.prototype = {
  data: PropTypes.object.isRequired,
};
export default AccountItem;