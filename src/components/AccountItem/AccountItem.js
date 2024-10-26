import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import style from './AccountItem.module.scss';
import AccountActions from './components/AccountActions';
import { Image } from '../Images';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
const cx = classNames.bind(style);
function AccountItem({ data, dark }) {
  return (
    <Link to={`/${data.username}`} className={cx('wrapper', { dark })}>
      <div className={cx('avt')}>
        <Avatar size={40} src={data.image} alt="" />
      </div>

      <div className={cx('info')}>
        <h4 className={cx('username')}>
          {data.username}

          {data.role && (
            <span className={cx('check')}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          )}
        </h4>
        <span className={cx('name')}>{`${data.firstName || ''} ${data.maidenName || ''} ${data.lastName || ''}`}</span>
      </div>
      <Tippy placement="bottom-end" interactive render={(attas) => <AccountActions dark />}>
        <span className={cx('actions')}>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </Tippy>
    </Link>
  );
}
AccountItem.prototype = {
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};

export default AccountItem;
