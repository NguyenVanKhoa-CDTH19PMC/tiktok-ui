import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './AccountActions.module.scss';
import classNames from 'classnames/bind';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWapper } from '~/components/Popper';

const cx = classNames.bind(style);

function AccountActions() {
  return (
    <PopperWapper>
      <div className={cx('wrapper')}>
        <ul className={cx('action-list')}>
          <li className={cx('action-item')}>
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faFlag} />
            </span>
            <span className={cx('title')}>Report</span>
          </li>
          <li className={cx('separate', 'action-item')}>
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faHeartBroken} />
            </span>
            <span className={cx('title')}>Make as irrelevant</span>
          </li>
        </ul>
      </div>
    </PopperWapper>
  );
}

export default AccountActions;
