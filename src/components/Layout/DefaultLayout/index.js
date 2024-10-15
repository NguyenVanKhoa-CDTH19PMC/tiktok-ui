import Button from '~/components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
