import PropTypes from 'prop-types';
import style from './RangeInput.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useEffect } from 'react';
const cx = classNames.bind(style);

const RangeInput = forwardRef(({ value = 0, onChange, large, vertical }, ref) => {
  useEffect(() => {
    function updateBackground() {
      const curentValue = ref.current.value;
      const max = ref.current.max;

      const percent = (curentValue / max) * 100;

      ref.current.style.background = `linear-gradient(to right, #fff ${percent}%, #ffffff57 ${percent}%)`;
    }

    ref.current.addEventListener('input', updateBackground);
    updateBackground();
  }, [value]);
  return (
    <div className={cx('volume-range', { vertical: vertical, large: large })}>
      <input ref={ref} min="0" max="100" value={value} onChange={onChange} type="range"></input>
    </div>
  );
});
RangeInput.prototype = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  ref: PropTypes.func,
};
export default RangeInput;
