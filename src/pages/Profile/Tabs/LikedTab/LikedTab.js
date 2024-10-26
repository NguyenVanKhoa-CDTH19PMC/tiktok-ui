import classNames from 'classnames/bind';
import style from './LikedTab.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function LikedTab({ user }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('private-page')}>
        <div className={cx('icon')}>
          <FontAwesomeIcon icon={faLock} />
        </div>
        <p className={cx('title')}>This user's liked videos are private</p>
        <div className={cx('decription')}>{`Videos liked by ${user.username || 'this user'} are currently hidden`}</div>
      </div>
    </div>
  );
}
LikedTab.prototype = { user: PropTypes.object };
export default LikedTab;
