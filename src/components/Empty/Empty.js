import PropTypes from 'prop-types';
import style from './Empty.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function Empty({
  icon = <FontAwesomeIcon icon={faExclamationCircle} />,
  title = 'Not found',
  decription = 'No content to display',
}) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('icon')}>{icon}</div>
      <p className={cx('title')}>{title}</p>
      <div className={cx('decription')}>{decription}</div>
    </div>
  );
}

export default Empty;
