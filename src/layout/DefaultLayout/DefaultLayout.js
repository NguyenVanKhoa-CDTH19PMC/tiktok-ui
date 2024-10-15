import PropTypes from 'prop-types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
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
DefaultLayout.prototype = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
