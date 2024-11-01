import { Wrapper } from '~/components/Popper';
import style from './Messages.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faGear, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Input from '~/components/FormControls/Input';
import { useRef, useState } from 'react';

const cx = classNames.bind(style);
function Messages() {
  const [chatsDemo, setChatDemo] = useState([
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
    { value: 'hello', type: 'push' },
    { value: 'hello', type: 'pull' },
  ]);
  const [chatInput, setChatInput] = useState();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('message-list-container')}>
        <Wrapper className={cx('message-list-wrapper')}>
          <div className={cx('message-list-header')}>
            <h1 className={cx('message-list-title')}>Messages</h1>
            <div className={cx('setting-button')}>
              <FontAwesomeIcon icon={faGear} />
            </div>
          </div>
          <div className={cx('message-list')}>
            {chatsDemo.map(() => (
              <div className={cx('message-item')}>
                <div className={cx('message-avatar')}>
                  <Avatar size={56} />
                </div>
                <div className={cx('message-infor')}>
                  <div className={cx('name')}>Name</div>
                  <div className={cx('newer-text')}>
                    text
                    <div className={cx('newer-text-time')}>5:54PM </div>
                  </div>
                </div>
                <div className={cx('action-button')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
      <div className={cx('chat-box')}>
        <Wrapper className={cx('chat-box-wrapper')}>
          <div className={cx('chat-box-header')}>
            <div className={cx('chat-box-avatar')}>
              <Avatar size={48} />
            </div>
            <div className={cx('chat-box-infor')}>
              <p className={cx('name')}>Name</p>
              <p className={cx('username')}>@username</p>
            </div>
          </div>
          <div className={cx('chat-box-content')}>
            {chatsDemo.map((chat) => (
              <div className={cx('chat-item-container', { pull: chat.type === 'pull', push: chat.type === 'push' })}>
                <div className={cx('chat-item')}>
                  <div className={cx('chat-avatar')}>
                    <Avatar size={32} />
                  </div>
                  <div className={cx('chat-content')}>{chat.value}</div>
                  <div className={cx('chat-action-button')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={cx('chat-box-fooder')}>
            <Input onChange={(e) => setChatInput(e.target.value)} placeholder="Send a message..." />
            <div
              onClick={() => setChatDemo((pre) => [...pre, { value: chatInput, type: 'push' }])}
              className={cx('submit-button', { show: chatInput })}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

export default Messages;
