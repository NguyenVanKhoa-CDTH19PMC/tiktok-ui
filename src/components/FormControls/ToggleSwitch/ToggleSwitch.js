import style from './ToggleSwitch.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function ToggleSwitch() {
  return (
    <label className={cx('toggle')}>
      <input className={cx('toggleswitch')} type="checkbox" />
      <span className={cx('roundbutton')}></span>
    </label>
  );
}

export default ToggleSwitch;
