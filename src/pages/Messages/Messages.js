import { Wrapper } from '~/components/Popper';
import style from './Messages.module.scss';
import classNames from 'classnames/bind';
import Avatar from '~/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faArrowsUpToLine,
  faBan,
  faEllipsis,
  faGear,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Input from '~/components/FormControls/Input';
import { useEffect, useRef, useState } from 'react';
import Loading from '~/components/Loading';
import IconButton from '~/components/IconButton';
import Menu from '~/components/Popper/Menu';
import { faBellSlash, faFlag, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function Messages() {
  const chatInputRef = useRef();
  const [chatInput, setChatInput] = useState();
  const [messageActive, setMessageActive] = useState();
  const [messageDemo, setMessageDemo] = useState([
    {
      id: 1,
      name: 'Khoa',
      draf: 'hello ',
      chats: [
        { id: 1, value: 'hello', type: 'push', liked: true },
        { id: 2, value: 'hello', type: 'pull' },
        { id: 3, value: 'hello', type: 'push' },
        { id: 4, value: 'hello', type: 'pull' },
        { id: 5, value: 'hello', type: 'push', liked: true },
        { id: 6, value: 'hello', type: 'pull' },
        { id: 7, value: 'hello', type: 'push' },
        { id: 8, value: 'hello', type: 'pull' },
        { id: 9, value: 'hello', type: 'push' },
        { id: 10, value: 'hello', type: 'pull' },
        { id: 11, value: 'hello', type: 'push' },
        { id: 12, value: 'hello', type: 'pull' },
        { id: 13, value: 'hello', type: 'push' },
        { id: 14, value: 'hello', type: 'pull' },
      ],
    },
    {
      id: 2,
      name: 'Long',
      draf: '',
      chats: [
        { id: 1, value: 'hello', type: 'push' },
        { id: 2, value: 'hello', type: 'pull' },
        { id: 3, value: 'hello', type: 'push' },
      ],
    },
  ]);

  useEffect(() => {
    setChatInput(messageActive?.draf || '');
  }, [messageActive]);
  const renderChatBox = () => {
    if (messageActive) {
      console.log('do');

      return (
        <>
          <div className={cx('chat-box-header')}>
            <div className={cx('chat-box-avatar')}>
              <Avatar size={48} />
            </div>
            <div className={cx('chat-box-infor')}>
              <p className={cx('name')}>{messageActive.name}</p>
              <p className={cx('username')}>@username</p>
            </div>
          </div>
          <div className={cx('chat-box-content')}>
            {messageActive.chats?.map((chat) => (
              <div className={cx('chat-item-container', { pull: chat.type === 'pull', push: chat.type === 'push' })}>
                <div className={cx('chat-item')}>
                  <div className={cx('chat-avatar')}>
                    <Avatar size={32} />
                  </div>
                  <div className={cx('chat-content')}>{chat.value} </div>

                  <Menu
                    data={[
                      {
                        icon: <FontAwesomeIcon icon={faHeart} />,
                        title: 'Like',
                        onClick: () => {
                          setMessageDemo((pre) => {
                            //add chat
                            let temp = [...pre];
                            temp
                              .find((i) => i.id === messageActive.id)
                              .chats.find((i) => i.id === chat.id).liked = true;

                            return temp;
                          });
                        },
                      },
                      {
                        icon: <FontAwesomeIcon icon={faTrashCan} />,
                        title: 'Delete',
                      },

                      {
                        icon: <FontAwesomeIcon icon={faFlag} />,
                        title: 'Report',
                      },
                    ]}
                    delay={[0, 0]}
                    trigger="click"
                  >
                    <div className={cx('chat-action-button')}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </Menu>
                </div>
                <div className={cx('chat-liked', { show: chat.liked })}>
                  <div className={cx('liked-icon')}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className={cx('liked-avatar')}>
                    <Avatar size={17} />
                  </div>
                </div>
              </div>
            ))}
            <div className={cx('chat-loading')}>
              <Loading size={10} />
            </div>
          </div>

          <div className={cx('chat-box-fooder')}>
            <Input
              ref={chatInputRef}
              value={chatInput}
              tag
              emoij
              onChange={(e) => {
                setChatInput(e.target.value);
                setMessageDemo((pre, index) => {
                  //save input to chat's draf
                  let temp = [...pre];
                  temp.find((i) => i.id == messageActive.id).draf = e.target.value;
                  return temp;
                });
              }}
              placeholder="Send a message..."
            />
            <div
              onClick={() => {
                setChatInput('');
                setMessageDemo((pre) => {
                  //remove chat's draf
                  let temp = [...pre];
                  temp.find((i) => i.id === messageActive.id).draf = '';

                  return temp;
                });
                setMessageDemo((pre) => {
                  //add chat
                  let temp = [...pre];
                  temp.find((i) => i.id === messageActive.id).chats.unshift({ value: chatInput, type: 'push' });

                  return temp;
                });
              }}
              className={cx('submit-button', { show: chatInput })}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('message-list-container')}>
        <div className={cx('back-button')}>
          <IconButton icon={<FontAwesomeIcon icon={faAngleLeft} />} />
        </div>
        <Wrapper className={cx('message-list-wrapper')}>
          <div className={cx('message-list-header')}>
            <h1 className={cx('message-list-title')}>Messages</h1>
            <div className={cx('setting-button')}>
              <FontAwesomeIcon icon={faGear} />
            </div>
          </div>
          <div className={cx('message-list')}>
            {messageDemo?.map((message) => (
              <div
                onClick={() => {
                  setMessageActive(message);
                }}
                className={cx('message-item', { active: messageActive?.id === message.id })}
              >
                <div className={cx('message-avatar')}>
                  <Avatar size={56} />
                </div>
                <div className={cx('message-infor')}>
                  <div className={cx('name')}>{message.name}</div>
                  <div className={cx('newer-text')}>
                    {message.chats[0].value}
                    <div className={cx('newer-text-time')}>5:54PM </div>
                  </div>
                </div>
                <Menu
                  data={[
                    {
                      icon: <FontAwesomeIcon icon={faBellSlash} />,
                      title: 'Mute',
                    },
                    {
                      icon: <FontAwesomeIcon icon={faTrashCan} />,
                      title: 'Delete',
                    },
                    {
                      icon: <FontAwesomeIcon icon={faArrowsUpToLine} />,
                      title: 'Pin to top',
                    },
                    {
                      icon: <FontAwesomeIcon icon={faFlag} />,
                      title: 'Report',
                    },
                    {
                      icon: <FontAwesomeIcon icon={faBan} />,
                      title: 'Block',
                    },
                  ]}
                  delay={[0, 0]}
                  trigger="click"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={cx('action-button')}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </Menu>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
      <div className={cx('chat-box')}>
        <Wrapper className={cx('chat-box-wrapper')}>{renderChatBox()} </Wrapper>
      </div>
    </div>
  );
}

export default Messages;
