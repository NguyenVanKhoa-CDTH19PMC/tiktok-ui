import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/animations/scale.css';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function Menu({ children, data, hideOnClick = false, ...prop }) {
  const [history, setHistory] = useState([{ data: data }]);
  const current = history[0];
  const leverMenu = history.length;
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          leverMenu={leverMenu}
          onClick={() => {
            if (isParent) {
              setHistory((pre) => [item.children, ...pre]);
            }
          }}
        ></MenuItem>
      );
    });
  };
  const renderResult = (attas) => (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div {...prop}>
      <PopperWrapper>
        {current.title && (
          <div className={cx('menu-header')}>
            <i className={cx('back-icon')} onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </i>
            <h4 className={cx('menu-title')}>{current.title}</h4>
          </div>
        )}

        <ul className={cx('menu-list')}>{renderItems()}</ul>
      </PopperWrapper>
    </div>
  );
  const handleReset = () => {
    setHistory((pre) => [pre[pre.length - 1]]);
  };
  const handleBack = () => {
    setHistory((pre) => [...pre.slice(1)]);
  };
  return (
    <Tippy
      interactive
      offset={[12, 12]}
      placement="bottom-end"
      delay={[0, 700]}
      hideOnClick={hideOnClick}
      render={renderResult}
      //back to lever 1 menu after menu hide
      onHide={handleReset}
    >
      {children}
    </Tippy>
  );
}
Menu.prototype = {
  children: PropTypes.node.isRequired,
  data: PropTypes.array.isRequired,
  hideOnClick: PropTypes.bool,
};
export default Menu;