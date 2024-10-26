import HeadlessTippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import style from './EmoijTable.module.scss';
import classNames from 'classnames/bind';
import { Wrapper } from '../Popper';
import { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(style);

const EmoijTable = ({ children, pushEmoijSelected }) => {
  const [emoijs, setEmoijs] = useState();
  const [emoijSelected, setEmoijSelected] = useState();
  useEffect(() => {
    const fecthApi = async () => {
      const result = await axios.get(
        'https://emoji-api.com/emojis?access_key=0b2d623fef9a7b0370f2aa86fab4211a646e3394',
      );
      setEmoijs(result.data);
    };
    fecthApi();
  }, []);
  return (
    <HeadlessTippy
      // show top view
      appendTo={document.body}
      interactive
      trigger="click"
      // offset={offset}
      // placement={placement}
      // delay={delay}
      // hideOnClick={hideOnClick}
      // //back to lever 1 menu after menu hide
      // onHide={handleReset}
      render={() => (
        <Wrapper>
          <div className={cx('wrapper')}>
            <div className={cx('emoij-list')}>
              {emoijs?.map((emoij) => (
                <div
                  key={emoij.codePoint}
                  onClick={() => {
                    pushEmoijSelected(emoij);
                    setEmoijSelected(emoij);
                  }}
                  className={cx('emoij-item')}
                >
                  {emoij.character}
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      )}
    >
      {children}
    </HeadlessTippy>
  );
};

export default EmoijTable;
