import style from './Fooder.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Fooder({ ...props }) {
  return (
    <footer className={cx('footer', props.className)}>
      <div className={cx('footer-banner')}>
        <img
          src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop-islands/8152caf0c8e8bc67ae0d.png"
          alt="banner"
        />
        <div className={cx('banner-content')}>
          <h4>Create TikTok effects, get a reward</h4>
        </div>
      </div>
      <h4 className={cx('footer-item')}>Company</h4>
      <h4 className={cx('footer-item')}>Program</h4>
      <h4 className={cx('footer-item')}>Terms & Policies</h4>
      <h4 className={cx('coppyright')}>© 2024 TikTok</h4>
    </footer>
  );
}

export default Fooder;
