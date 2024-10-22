import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './PostItem.module.scss';
import videos from '~/assets/videos';
import { FloatIcon, MusicIcon, MuteIcon, ThreeDotVIcon, UnMuteIcon } from '~/components/Icons';
import RangeInput from '../../RangeInput';
import ActionsBar from './ActionsBar';
import { getUser } from '~/services/userService';
import Playhead from '~/components/PlayHead';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import PostMoreActionsMenu from '../PostMoreActionsMenu';
const cx = classNames.bind(style);

function PostItem({ data, onSetVolume, onMute, volume }) {
  const videoRef = useRef();
  const [play, setPlay] = useState(true);
  // const [volume, setVolume] = useState({ preValue: 0, value: 0 });
  const volumeRef = useRef();
  const notiLikeRef = useRef();
  const [moreText, setMoreText] = useState(false);
  const [showNotiLiked, setShowNotiLiked] = useState(false);

  const [author, setAuthor] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const authorData = await getUser(data.userId);
      setAuthor(authorData);
    };
    fetchApi();
  }, [data.userId]);

  useEffect(() => {
    const updateWidth = () => {
      if (videoRef.current) {
        videoRef.current.parentElement.style.width = `${videoRef.current.offsetWidth}px`;
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [videoRef.current && videoRef.current.offsetWidth]);
  //event play/pause video when in/out side current web tab
  // useEffect(() => {
  //   console.log(play);
  //   const handleVisibilityChange = document.addEventListener('visibilitychange', () => {
  //     if ((document.visibilityState === 'visible') & play) {
  //       // when in side
  //       handlePlay();
  //     } else {
  //       // when out side
  //       handlePause();
  //     }
  //   });
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [play]);

  // set video volume
  useEffect(() => {
    if (videoRef.current) {
      //volume only 0 to 1
      videoRef.current.volume = volume.value / 100;
    }
  }, [volume.value]);

  useEffect(() => {
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoRef.current.play(); // Phát video khi vào khung nhìn
            } else {
              videoRef.current && videoRef.current.pause(); // Dừng video khi ra khỏi khung nhìn
            }
          });
        },
        { threshold: 0.7 }, // Kích hoạt khi ít nhất 70% phần tử vào khung nhìn
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, []);

  const handlePlay = () => {
    videoRef.current && videoRef.current.play();
  };
  const handlePause = () => {
    videoRef.current && videoRef.current.pause();
  };
  const handleClick = async () => {
    if (videoRef.current && videoRef.current.paused) {
      handlePlay();
      setPlay(true);
    } else {
      handlePause();
      setPlay(false);
    }
  };
  const handleDoubleClick = (e) => {
    setShowNotiLiked(true);
    //center div in point
    const left = e.clientX - videoRef.current.getBoundingClientRect().x - 45;
    const top = e.clientY - videoRef.current.getBoundingClientRect().y - 45;
    notiLikeRef.current.style.left = left + 'px';
    notiLikeRef.current.style.top = top + 'px';
    notiLikeRef.current.children[0].style.transform = `rotate(${Math.floor(Math.random() * 61) - 30}deg)`;

    setTimeout(() => {
      setShowNotiLiked(false);
    }, 1000);
  };
  const handleMute = () => {
    onMute();
  };

  const handleChangeValue = () => {
    onSetVolume({ value: volumeRef.current.value });
  };
  return (
    <>
      <article className={cx('article-item')}>
        <div className={cx('acrticle-grid')}>
          <div className={cx('spacer')}></div>
          <section className={cx('media-container')}>
            <div className={cx('media-card')}>
              <div className={cx('video-container')}>
                <video
                  muted={volume.value == 0}
                  onClick={() => handleClick()}
                  onDoubleClickCapture={(e) => handleDoubleClick(e)}
                  ref={videoRef}
                  loop
                  //autoplay only works when user interrects or video is muted
                  // autoPlay
                  className={cx('video')}
                  src={videos.videoDemo}
                />
              </div>
              <div className={cx('background-mark')}></div>
              <div className={cx('card-top')}>
                <div className={cx('volume-change')}>
                  <button
                    //show icon mute when video mute
                    style={{ visibility: volume.value == 0 && 'visible' }}
                    onClick={() => handleMute()}
                    className={cx('volume-btn')}
                  >
                    {volume.value == 0 ? <MuteIcon /> : <UnMuteIcon />}
                  </button>
                  <div className={cx('volume-range')}>
                    <RangeInput value={volume.value} onChange={() => handleChangeValue()} ref={volumeRef} />
                  </div>
                </div>

                <PostMoreActionsMenu>
                  <button className={cx('more-btn')}>
                    <ThreeDotVIcon />
                  </button>
                </PostMoreActionsMenu>
              </div>
              <div className={cx('card-botton')}>
                <div className={cx('author-container')}>
                  <Link to={'/@'} className={cx('author-title')}>
                    <h3>{author.username}</h3>
                  </Link>
                </div>
                <div
                  className={cx('multiline-text-container', {
                    'is-more': moreText,
                  })}
                >
                  <div className={cx('multiline-text')}>{data.body}</div>
                  <button onClick={() => setMoreText((pre) => !pre)} className={cx('more-btn')}>
                    {moreText ? 'less' : 'more'}
                  </button>
                </div>
                <div className={cx('cart-botton-fooder')}>
                  <Link to={'/@'} className={cx('music-container')}>
                    <i className={cx('music-icon')}>
                      <MusicIcon />
                    </i>
                    <p className={cx('music-text')}>{data.title}</p>
                  </Link>
                  <Tippy
                    appendTo={document.body}
                    placement="top"
                    interactive
                    offset={[0, 10]}
                    content="Floating Player"
                  >
                    <div className={cx('mini-player-btn')}>
                      <FloatIcon />
                    </div>
                  </Tippy>
                </div>
              </div>
              <div className={cx('noti-video-state', { 'play-state': play, 'pause-state': !play })}>
                <div className={cx('noti-play')}>
                  <FontAwesomeIcon className={cx('icon')} icon={faPlay} />
                </div>
                <div className={cx('noti-pause')}>
                  <FontAwesomeIcon className={cx('icon')} icon={faPause} />
                </div>
              </div>
              <div ref={notiLikeRef} className={cx('noti-liked', { show: showNotiLiked })}>
                <div className={cx('icon')}>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div className={cx('playhead-container')}>{/* <Playhead /> */}</div>
            </div>
          </section>
          <div className={cx('spacer')}></div>
          <ActionsBar post={data} author={author} />
        </div>
      </article>
    </>
  );
}
PostItem.prototype = {
  data: PropTypes.object,
  onSetVolume: PropTypes.func,
  onMute: PropTypes.func,
  volume: PropTypes.number,
};
export default PostItem;
