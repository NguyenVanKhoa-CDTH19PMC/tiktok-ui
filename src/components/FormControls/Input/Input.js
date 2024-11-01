import PropTypes from 'prop-types';
import style from './Input.module.scss';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
const cx = classNames.bind(style);
const Input = forwardRef(({ rightInput, placeholder, onChange }, ref) => {
  return (
    <div className={cx('comment-input-container')}>
      <input onChange={(e) => onChange(e)} ref={ref} placeholder={placeholder} className={cx('comment-input')} />
      {rightInput}
    </div>
  );
});
Input.prototype = {};
export default Input;
