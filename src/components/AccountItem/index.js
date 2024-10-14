import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import style from './AccountItem.module.scss';
import { Wrapper as PopperWapper } from '../Popper';
import AccountActions from './components/AccountActions';
import { Image } from '../Images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <div className={cx('avt')}>
        <Image fallback="https://placehold.co/40x40/fe2c54/white" src={data.avatar} alt="" />
      </div>

      <div className={cx('info')}>
        <h4 className={cx('name')}>
          {data.full_name}
          {data.tick && (
            <span className={cx('check')}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          )}
        </h4>
        <span className={cx('username')}>{data.nickname}</span>
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
    </Link>
  );
}

export default AccountItem;
