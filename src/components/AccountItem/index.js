import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import style from './AccountItem.module.scss';
import { Wrapper as PopperWapper } from '../Popper';
import AccountActions from './components/AccountActions';
import { Image } from '../Images';
const cx = classNames.bind(style);
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('avt')}>
        <Image src="https://placehold.co/40x40/fe2c54/white" alt="" />
      </div>

      <div className={cx('info')}>
        <h4 className={cx('name')}>
          Cristiano Ronaldo{' '}
          <span className={cx('check')}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </span>
        </h4>
        <span className={cx('username')}>cristiano.ronaldo</span>
      </div>
      <Tippy
        placement="bottom-end"
        interactive
        // visible
        render={(attas) => (
          <PopperWapper>
            <AccountActions />
          </PopperWapper>
        )}
      >
        <span className={cx('actions')}>
          <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </Tippy>
    </div>
  );
}

export default AccountItem;
