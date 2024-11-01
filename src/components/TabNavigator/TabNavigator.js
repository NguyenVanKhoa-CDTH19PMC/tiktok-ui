import classNames from 'classnames/bind';
import style from './TabNavigator.module.scss';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(style);

function TabNavigator({ data, onSelectTab }) {
  const tabRef = useRef([]);
  const [tabActive, setTabActive] = useState(data[0].id);
  const tagTabRef = useRef();
  useEffect(() => {
    onSelectTab(tabActive);
  }, [tabActive]);
  useEffect(() => {
    const updateTagTab = (tab) => {
      tagTabRef.current.style.width = tab.getBoundingClientRect().width + 'px';
      tagTabRef.current.style.left =
        tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px';
    };
    updateTagTab(tabRef.current[tabActive]);
    tabRef.current.forEach((tab) => {
      tab.addEventListener('mouseenter', () => {
        updateTagTab(tab);
      });
    });
    tabRef.current.forEach((tab) => {
      tab.addEventListener('mouseleave', () => {
        updateTagTab(tabRef.current[tabActive]);
      });
    });
    return () => {
      tabRef.current.forEach((tab) => {
        tab?.removeEventListener('mouseenter', () => {
          updateTagTab(tab);
        });
      });
      tabRef.current.forEach((tab) => {
        tab?.removeEventListener('mouseleave', () => {
          updateTagTab(tabRef.current[tabActive]);
        });
      });
    };
  }, [tabActive]);
  return (
    <div className={cx('tab-list')}>
      {data.map((tab) => (
        <div
          key={tab.id}
          ref={(el) => (tabRef.current[tab.id] = el)}
          onClick={() => {
            setTabActive(tab.id);
          }}
          className={cx('tab-item', { active: tabActive == tab.id })}
        >
          <i className={cx('tab-icon')}>{tab.icon}</i>
          <span className={cx('tab-title')}>{tab.title}</span>
        </div>
      ))}

      <div ref={tagTabRef} className={cx('tab-active-tag')}></div>
    </div>
  );
}

export default TabNavigator;
