import classNames from 'classnames/bind';
import style from './LikedTab.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Empty from '~/components/Empty';
const cx = classNames.bind(style);

function LikedTab({ user }) {
  return (
    <div className={cx('wrapper')}>
      <Empty
        icon={<FontAwesomeIcon icon={faLock} />}
        title="This user's liked videos are private"
        decription={`Videos liked by ${user.username || 'this user'} are currently hidden`}
      />
    </div>
  );
}
LikedTab.prototype = { user: PropTypes.object };
export default LikedTab;
