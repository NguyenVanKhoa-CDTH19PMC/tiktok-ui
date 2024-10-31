import style from './CheckBox.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function CheckBox({ value, onCheck, disabled, className, children }) {
  return (
    <div className={cx('checkbox-container', { disabled: disabled }, className)}>
      <label className={cx('checkbox-input')}>
        <input
          disabled={disabled}
          value={value}
          onChange={(e) => {
            onCheck({ value: e.target.value, checked: e.target.checked });
          }}
          type="checkbox"
        />
        <div className={cx('custom-checkbox')}>
          <div className={cx('icon-checkbox')}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>

        <div className={cx('title')}> {children}</div>
      </label>
    </div>
  );
}

export default CheckBox;
