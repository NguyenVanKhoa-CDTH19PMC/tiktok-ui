import classNames from 'classnames/bind';
import style from './VideoTab.module.scss';
import PropTypes from 'prop-types';
import { Image } from '~/components/Images';
import PostThumbnail from '../../components/PostThumbnail';
import { useEffect, useRef, useState } from 'react';
import { getPostsByUserId } from '~/services/postSevices';
import Loading from '~/components/Loading';
const cx = classNames.bind(style);
function VideosTab({ userId, sortBy, order }) {
  const [posts, setPosts] = useState([]);

  const limit = 10;
  const observerRef = useRef();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const fecthApi = async () => {
    if (isOver) return;
    setLoading(true);

    const postResult = await getPostsByUserId(userId, {
      limit: 10,
      skip: (page - 1) * limit,
      sortBy: sortBy,
      order: order,
    });
    if ((page - 1) * limit + limit >= postResult.total) {
      setIsOver(true);
    }
    setPosts((pre) => [...pre, ...postResult.posts]);
    setLoading(false);
  };

  useEffect(() => {
    if (page > 0) fecthApi();
  }, [page, userId, sortBy, order]);
  // use IntersectionObserver để tải thêm khi phần tử vào viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); // Tăng trang
        }
      },
      { threshold: 1.0 }, // Chỉ kích hoạt khi phần tử vào hoàn toàn trong khung nhìn
    );

    if (observerRef.current) observer.observe(observerRef.current); // Quan sát phần tử

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Dọn dẹp
    };
  }, [loading]);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('playlists-container')}>
        <div className={cx('title')}>Playlists</div>
        <div className={cx('playlist-list')}>
          {[1, 2, 3, 4, 5, 6].map((playlist) => (
            <div key={playlist} className={cx('playlist-item')}>
              <div className={cx('image-cover')}>
                <Image size={72} src="" alt="" />
              </div>
              <div className={cx('playlist-infor')}>
                <p className={cx('playlist-name')}>Name</p>
                <p className={cx('post-count')}>20 posts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx('videos-container')}>
        <div className={cx('title')}>Videos</div>
        <div className={cx('post-list')}>
          {posts.map((post) => (
            <div key={post.id}>
              <PostThumbnail post={post} />
            </div>
          ))}
        </div>
        {loading && (
          <div className={cx('loading-container')}>
            <Loading size={10} />
          </div>
        )}
        {!loading && !isOver && <div ref={observerRef} className={cx('observer')}></div>}
        {isOver && <div className={cx('no-more-noti')}>No more posts</div>}
      </div>
    </div>
  );
}

export default VideosTab;
