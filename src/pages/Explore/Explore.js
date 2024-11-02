import style from './Explore.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
function Explore() {
  document.title = 'Explore - Find your favourite videos on TikTok';

  return <div className={cx('wrapper')}></div>;
}

export default Explore;
