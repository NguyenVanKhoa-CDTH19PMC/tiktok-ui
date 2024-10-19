import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
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
    <Link to={`/${data.username}`} className={cx('wrapper')}>
      <div className={cx('avt')}>
        <Image fallback="https://placehold.co/40x40/fe2c54/white" src={data.image} alt="" />
      </div>

      <div className={cx('info')}>
        <h4 className={cx('name')}>
          {`${data.firstName} ${data.maidenName} ${data.lastname}`}
          {data.role && (
            <span className={cx('check')}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          )}
        </h4>
        <span className={cx('username')}>{data.username}</span>
      </div>
      <Tippy
        placement="bottom-end"
        interactive
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
AccountItem.prototype = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
