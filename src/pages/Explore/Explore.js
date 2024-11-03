import { Button } from '~/components/FormControls';
import style from './Explore.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import PostThumbnail from '../Profile/components/PostThumbnail';
import { searchPosts } from '~/services/postSevices';

const cx = classNames.bind(style);
function Explore() {
  document.title = 'Explore - Find your favourite videos on TikTok';
  const listRef = useRef();
  const leftArrowRef = useRef();
  const rightArrowRef = useRef();
  const [posts, setPosts] = useState();
  const [categoryActive, setCategoryActive] = useState('All');
  const fetchApi = async () => {
    const postsResult = await searchPosts({ limit: 10, skip: 0, q: 'jo' });
    setPosts(postsResult.posts);
  };
  function updateArrows() {
    // Ẩn nút mũi tên trái khi ở đầu
    leftArrowRef.current.style.display = listRef.current.scrollLeft === 0 ? 'none' : 'flex';

    rightArrowRef.current.style.display = listRef.current.scrollRight === 0 ? 'none' : 'flex';

    // Ẩn nút mũi tên phải khi cuộn đến cuối
    const maxScrollLeft = listRef.current.scrollWidth - listRef.current.scrollLeft;
    rightArrowRef.current.style.display = listRef.current.scrollLeft >= maxScrollLeft ? 'none' : 'flex';
  }
  useEffect(() => {
    fetchApi();
    updateArrows();
    listRef.current.addEventListener('scroll', updateArrows);
  }, []);
  function scrollLeft() {
    listRef.current.scrollBy({ left: -listRef.current.offsetWidth / 2, behavior: 'smooth' });
  }

  function scrollRight() {
    listRef.current.scrollBy({ left: listRef.current.offsetWidth / 2, behavior: 'smooth' });
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('category-list-container')}>
        <div className={cx('category-content')}>
          <div ref={listRef} className={cx('category-list')}>
            {[
              'All',
              'Sinhing & Dancing',
              'Commedy',
              'Sports',
              'Anime & Comics',
              'Relationship',
              'Shows',
              'Lipsync',
              'Daily lift',
              'Beauty Care',
              'Game',
            ].map((category, index) => (
              <div key={index} className={cx('category-item')}>
                <Button
                  onClick={() => {
                    setCategoryActive(category);
                  }}
                  moreRadius
                  active={category === categoryActive}
                  secondary
                >
                  {category}
                </Button>
              </div>
            ))}
          </div>
          <div ref={leftArrowRef} className={cx('arrow-container', 'left')}>
            <div onClick={() => scrollLeft()} className={cx('arrow-button')}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </div>
          <div ref={rightArrowRef} className={cx('arrow-container', 'right')}>
            <div onClick={() => scrollRight()} className={cx('arrow-button')}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('list')}>
          {posts?.map((post) => (
            <div key={post.id}>
              <PostThumbnail post={post} extendAuthor />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
