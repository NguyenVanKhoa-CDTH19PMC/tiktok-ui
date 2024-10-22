import PostItem from '~/components/Post/PostItem';
import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { getPosts } from '~/services/postSevices';
import Loading from '~/components/Loading';

const cx = classNames.bind(style);
function Home() {
  const limit = 1;
  const [post, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const [volume, setVolume] = useState({ preValue: 0, value: 0 });
  const [loading, setLoading] = useState(false);

  const handleVolume = (v = volume) => {
    setVolume((pre) => ({ value: v.value, preValue: pre.value }));
  };

  const handleMute = () => {
    setVolume((pre) => ({ value: pre.value == 0 ? pre.preValue : 0, preValue: pre.value == 0 ? 0 : pre.value }));
  };
  const fetchApi = () => {
    setLoading(true);
    try {
      const fetchApi = async () => {
        const result = await getPosts({ limit: limit, skip: (page - 1) * limit });
        setPosts((pre) => [...pre, ...result.posts]);
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchApi();
  }, [page]);
  useEffect(() => {}, []);
  // Sử dụng IntersectionObserver để tải thêm khi phần tử vào viewport
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
      <div className={cx('post-list')}>
        {post.map((post) => {
          return (
            <div key={post.id} className={cx('post-item')}>
              <PostItem volume={volume} onSetVolume={handleVolume} onMute={handleMute} data={post} />
            </div>
          );
        })}
        <div className={cx('loading-container')} ref={observerRef}>
          <div className={cx('loading')}>
            <Loading size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
