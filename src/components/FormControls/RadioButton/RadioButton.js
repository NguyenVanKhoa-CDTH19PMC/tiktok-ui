import style from './RadioButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function RadioButton({ selected, value, name, onSelect, disabled, children, className }) {
  return (
    <label className={cx('radio-button', { disabled: disabled }, className)}>
      <input
        checked={selected}
        disabled={disabled}
        value={value}
        name={name}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        type="radio"
      />
      <div className={cx('custom-radio')}></div>
      <div className={cx('title')}> {children}</div>
    </label>
  );
}

export default RadioButton;
