import { faClosedCaptioning, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faAt,
  faCircleCheck,
  faClose,
  faCode,
  faEllipsis,
  faPaperPlane,
  faPause,
  faPlay,
  faRepeat,
  faSearch,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import videos, { videosDemo } from '~/assets/videos';
import style from './PostDetail.module.scss';
import images from '~/assets/images';
import { BookMarkIcon, CommentIcon, FloatIcon, HeartIcon, MusicIcon, MuteIcon, UnMuteIcon } from '~/components/Icons';
import Search from '~/components/SearchForm';
import PostMoreActionsMenu from '~/components/Post/PostMoreActionsMenu';
import RangeInput from '~/components/RangeInput';
import Avatar from '~/components/Avatar';
import { getPost } from '~/services/postSevices';
import { getUser } from '~/services/userService';
import Button from '~/components/Button';
import { numberDisplay } from '~/utils/numberDisplay';
import Menu from '~/components/Popper/Menu';
import CommentsTab from './Tab/CommentsTab';
import { createPortal } from 'react-dom';
import ReviewProfile from '~/components/ReviewProfile';
import EmoijTable from '~/components/EmoijTabla';

const cx = classNames.bind(style);
function PostDetail() {
  const { username, postId } = useParams();
  const videoRef = useRef();
  const location = useLocation();
  const searchInputRef = useRef();
  const [searchInputValue, setSearchInputValue] = useState();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [tabActive, setTabActive] = useState('commentsTab');
  const videoDemo = useRef(videosDemo[Math.floor(Math.random() * 4)]);
  const [play, setPlay] = useState(false);
  const volumeRef = useRef();
  const [volume, setVolume] = useState({ preValue: 0, value: 0 });
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const MORE_SHARE_MENU = [{ title: 'Share to Twitter', icon: <FontAwesomeIcon icon={faTwitter} /> }];
  const handlePlay = () => {
    videoRef.current?.play();
  };
  const handlePause = () => {
    videoRef.current?.pause();
  };
  const handleClick = async () => {
    if (videoRef.current?.paused) {
      handlePlay();
      setPlay(true);
    } else {
      handlePause();
      setPlay(false);
    }
  };
  const handleBack = () => {
    navigate(-1); //back to pre page
  };
  const fecthApi = async () => {
    const postData = await getPost(postId);
    setPost(postData);
    const authorData = await getUser(postData.userId);
    setAuthor(authorData);
  };
  const handleMute = () => {
    setVolume((pre) => ({ value: pre.value == 0 ? pre.preValue : 0, preValue: pre.value == 0 ? 0 : pre.value }));
  };
  const handleChangeValue = () => {
    setVolume((pre) => ({ value: volumeRef.current.value, preValue: pre.value }));
  };
  useEffect(() => {
    searchInputRef.current.focus();

    fecthApi();
  }, []);
  // set video volume
  useEffect(() => {
    if (videoRef.current) {
      //volume only 0 to 1
      videoRef.current.volume = volume.value / 100;
    }
  }, [volume.value]);
  const renderTabContent = () => {
    switch (tabActive) {
      case 'commentsTab':
        return <CommentsTab postId={postId} />;
      case 'createrVideosTab':
        return <div>Developing...</div>;
      default:
        return <div>None</div>;
    }
  };
  // useEffect(() => {
  //   console.log(searchInputRef.current.selectionStart);
  // }, [searchInputValue]);
  const addTag = () => {
    //identify mouse position
    const start = searchInputRef.current.selectionStart;
    const end = searchInputRef.current.selectionEnd;

    // insert "@" in mouse position
    const before = searchInputRef.current.value.substring(0, start);
    const after = searchInputRef.current.value.substring(end);
    searchInputRef.current.value = before + ` @ ` + after;
    // tranlate present mouse
    searchInputRef.current.setSelectionRange(start + 2, start + 2);
    searchInputRef.current.focus();
  };
  const addEmoij = (emoij) => {
    //identify mouse position
    const start = searchInputRef.current.selectionStart;
    const end = searchInputRef.current.selectionEnd;

    // insert "@" in mouse position
    const before = searchInputRef.current.value.substring(0, start);
    const after = searchInputRef.current.value.substring(end);
    searchInputRef.current.value = before + emoij.character + after;
    // tranlate present mouse
    searchInputRef.current.setSelectionRange(start + 2, start + 2);
    searchInputRef.current.focus();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-container')}>
        <div className={cx('background')}>
          <img src={images.thumbnail} alt="background" />
        </div>
        <video
          className={cx('video')}
          volume={volume.value}
          onClick={() => handleClick()}
          loop
          ref={videoRef}
          src={videoDemo.current}
        />
        <div className={cx('noti-video-state', { 'play-state': play, 'pause-state': !play })}>
          <div className={cx('noti-play')}>
            <FontAwesomeIcon className={cx('icon')} icon={faPlay} />
          </div>
          <div className={cx('noti-pause')}>
            <FontAwesomeIcon className={cx('icon')} icon={faPause} />
          </div>
        </div>
        <div className={cx('video-control')}>
          <div className={cx('control-header')}>
            <button
              onClick={() => {
                handleBack();
              }}
              className={cx('icon-button')}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <div className={cx('search-bar')}>
              <Search transparent dark placeholder="Find related content" />
            </div>
            <div className={cx('more-actions-container')}>
              <PostMoreActionsMenu dark>
                <button className={cx('icon-button')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </PostMoreActionsMenu>
            </div>
          </div>
          <div className={cx('control-fooder')}>
            <Tippy appendTo={document.body} placement="top" interactive offset={[0, 10]} content="Captions">
              <button className={cx('icon-button', 'capption-button')}>
                <FontAwesomeIcon icon={faClosedCaptioning} />
              </button>
            </Tippy>
            <Tippy appendTo={document.body} placement="top" interactive offset={[0, 10]} content="Floating Player">
              <button className={cx('icon-button')}>
                <FloatIcon />
              </button>
            </Tippy>
            <div>
              <div className={cx('volume-change')}>
                <button
                  //show icon mute when video mute
                  onClick={() => handleMute()}
                  className={cx('icon-button', 'volume-btn')}
                >
                  {volume.value == 0 ? <MuteIcon /> : <UnMuteIcon />}
                </button>
                <div className={cx('volume-range')}>
                  <RangeInput
                    large
                    vertical
                    value={volume.value}
                    onChange={() => handleChangeValue()}
                    ref={volumeRef}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cx('control-right')}>
            <button className={cx('icon-button')}>
              <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <button className={cx('icon-button', 'down-button')}>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
        </div>
      </div>
      <div className={cx('post-info-container')}>
        <div className={cx('content-container')}>
          <div className={cx('profile')}>
            <div className={cx('description')}>
              <div className={cx('author')}>
                <ReviewProfile data={author}>
                  <div className={cx('avatar')}>
                    <Avatar size={40} src={author.image} />
                  </div>
                </ReviewProfile>
                <div className={cx('infor')}>
                  <ReviewProfile data={author}>
                    <Link className={cx('username')}>
                      {author.username} <FontAwesomeIcon icon={faCircleCheck} />
                    </Link>
                  </ReviewProfile>

                  <div className={cx('other-infor')}>
                    <span className={cx('fullname')}>{`${author.firstName || ''} ${author.maidenName || ''} ${
                      author.lastName || ''
                    }`}</span>{' '}
                    . <span className={cx('time')}>1d ago</span>
                  </div>
                </div>
                <div className={cx('follow-button')}>
                  <Button primary>Follow</Button>
                </div>
              </div>
              <h1 className={cx('des-text')}>{post.body}</h1>

              <Link to={'/@'} className={cx('music-container')}>
                <i className={cx('music-icon')}>
                  <MusicIcon />
                </i>
                <p className={cx('music-text')}>{post.title}</p>
              </Link>
            </div>
            <div className={cx('actions-bar-container')}>
              <div className={cx('actions-bar')}>
                <div className={cx('main-action')}>
                  <button onClick={() => setLike((pre) => !pre)} className={cx('action-item-button')}>
                    {like ? (
                      <span className={cx('icon-button', 'icon-active', 'like-icon')}>
                        <HeartIcon />
                      </span>
                    ) : (
                      <span className={cx('icon-button', 'like-icon')}>
                        <HeartIcon />
                      </span>
                    )}
                    {numberDisplay(post.reactions?.likes)}
                  </button>
                  <button className={cx('action-item-button')}>
                    <span className={cx('icon-button')}>
                      <CommentIcon />
                    </span>
                    {numberDisplay(post.reactions?.likes)}
                  </button>
                  <button onClick={() => setFavorite((pre) => !pre)} className={cx('action-item-button')}>
                    {favorite ? (
                      <span className={cx('icon-button', 'icon-active', 'favorite-icon')}>
                        <BookMarkIcon />
                      </span>
                    ) : (
                      <span className={cx('icon-button', 'favorite-icon')}>
                        <BookMarkIcon />
                      </span>
                    )}
                    {numberDisplay(post.reactions?.dislikes)}
                  </button>
                </div>
                <div className={cx('share-action')}>
                  <Tippy content="Repost">
                    <button className={cx('icon-button', 'repost-button')}>
                      <FontAwesomeIcon icon={faRepeat} />
                    </button>
                  </Tippy>
                  <Tippy content="Embed">
                    <button className={cx('icon-button', 'embed-button')}>
                      <FontAwesomeIcon icon={faCode} />
                    </button>
                  </Tippy>
                  <Tippy content="Sent to friend">
                    <button className={cx('icon-button', 'telegram-button')}>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </Tippy>
                  <Tippy content="Share to Facebook">
                    <button className={cx('icon-button', 'facebook-button')}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                  </Tippy>
                  <Tippy content="Share to Whatsapp">
                    <button className={cx('icon-button', 'whatsapp-button')}>
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </button>
                  </Tippy>

                  <Menu data={MORE_SHARE_MENU}>
                    <button className={cx('icon-button', 'more-button')}>
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </Menu>
                </div>
              </div>
              <div className={cx('coppy-link-container')}>
                <p className={cx('link')}>{`https://www.hosting.com${location.pathname}`}</p>
                <button className={cx('copy-link-button')}>Copy link</button>
              </div>
            </div>
          </div>
          <div className={cx('tab-menu-container')}>
            <div className={cx('tab-menu')}>
              <div
                onClick={() => setTabActive('commentsTab')}
                className={cx('tab-item', { active: tabActive === 'commentsTab' })}
              >{`Comments (${post.reactions?.likes})`}</div>
              <div
                onClick={() => setTabActive('createrVideosTab')}
                className={cx('tab-item', { active: tabActive === 'createrVideosTab' })}
              >
                Creater videos
              </div>
            </div>
            <div className={cx('recomment-search')}>
              {`Search: `}
              <Link>
                content serch <FontAwesomeIcon icon={faSearch} />
              </Link>
            </div>
          </div>
          <div className={cx('tab-content-container')}>{renderTabContent()}</div>
        </div>

        <div className={cx('footer-container')}>
          <div className={cx('comment-form')}>
            <div className={cx('comment-input-container')}>
              <input ref={searchInputRef} placeholder="Add comment..." className={cx('comment-input')} />
              <Tippy content={`“@” a user to tag them in your comments`}>
                <button
                  onClick={() => {
                    addTag();
                  }}
                  className={cx('mention-button')}
                >
                  <FontAwesomeIcon icon={faAt} />
                </button>
              </Tippy>
              <EmoijTable pushEmoijSelected={(emoij) => addEmoij(emoij)}>
                <Tippy content="Click to add emojis">
                  <button className={cx('emoji-button')}>
                    <FontAwesomeIcon icon={faFaceSmile} />
                  </button>
                </Tippy>
              </EmoijTable>
            </div>
            <button className={cx('submit-comment-button')}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
