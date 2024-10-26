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

function Menu({
  children,
  data,
  hideOnClick = false,
  offset = [12, 12],
  delay = [0, 700],
  placement = 'bottom-end',
  dark,
  ...prop
}) {
  const [history, setHistory] = useState([{ data: data }]);
  const current = history[0];
  const leverMenu = history.length;
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          dark={dark}
          key={index}
          data={item}
          leverMenu={leverMenu}
          to={item.to}
          onClick={() => {
            if (isParent) {
              setHistory((pre) => [item.children, ...pre]);
            } else {
              item.onclick() && item.onclick();
            }
          }}
        ></MenuItem>
      );
    });
  };
  const renderResult = (attas) => (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div className={cx({ dark: dark })} {...prop}>
      <PopperWrapper dark={dark}>
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
      // show top view
      appendTo={document.body}
      interactive
      offset={offset}
      placement={placement}
      delay={delay}
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
  offset: PropTypes.array,
  placement: PropTypes.string,
  delay: PropTypes.array,
  dark: PropTypes.bool,
};
export default Menu;
