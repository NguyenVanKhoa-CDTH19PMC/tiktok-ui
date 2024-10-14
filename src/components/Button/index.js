import { Link } from 'react-router-dom';
import style from './Button.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Button({
  children,
  primary = false,
  outline = false,
  rounded = false,
  small = false,
  large = false,
  to,
  href,
  text = false,
  disabled = false,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    text,
    disabled,
    rounded,
    small,
    large,
  });
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  return (
    <Comp className={classes}>
      <i className={cx('left-icon')}>{leftIcon}</i>
      {children}
    </Comp>
  );
}

export default Button;
