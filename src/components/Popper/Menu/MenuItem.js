import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import { Link } from 'react-router-dom';
// import Button from '~/components/Button';

const cx = classNames.bind(style);

function MenuItem({ data, to, href, className, onClick, disabled, ...passProps }) {
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
  const classes = cx('wrapper', {
    separate: data.separate,
  });
  return (
    <li className={classes}>
      <Comp className={cx('menu-item')} {...props}>
        {data.icon && <i className={cx('icon')}>{data.icon}</i>}
        <span>{data.title}</span>
      </Comp>
    </li>
  );
}

export default MenuItem;
