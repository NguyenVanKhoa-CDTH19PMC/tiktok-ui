import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './Button.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Button({
  children,
  primary = false,
  secondary = false,
  outline = false,
  rounded = false,
  icon = false,
  small = false,
  medium = false,
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
    secondary,
    icon,
    outline,
    text,
    disabled,
    rounded,
    small,
    medium,
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
    <Comp className={classes} {...props}>
      {leftIcon && <i className={cx('left-icon')}>{leftIcon}</i>}
      {children}
    </Comp>
  );
}
Button.prototype = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  icon: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};
export default Button;
