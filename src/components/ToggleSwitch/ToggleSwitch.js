import style from './ToggleSwitch.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function ToggleSwitch() {
  return (
    <label class={cx('toggle')}>
      <input className={cx('toggleswitch')} type="checkbox" />
      <span class={cx('roundbutton')}></span>
    </label>
  );
}

export default ToggleSwitch;
