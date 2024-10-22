import style from './Loading.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Loading({ size = 10 }) {
  const style = { '--size': size + 'px' };
  return (
    <div className={cx('container')} style={style}>
      <div className={cx('tiktok')}></div>
      <div className={cx('tiktok', 'red')}></div>
    </div>
  );
}

export default Loading;
