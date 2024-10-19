import { useEffect, useRef, useState } from 'react';
import style from './Playhead.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Playhead() {
  const scrubRef = useRef();
  const playheadRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (scrubRef.current) {
      // Sự kiện khi nhấn chuột xuống
      const mouseDown = (e) => {
        setIsDragging(true);
        console.log(e.clientX);
        setValue(e.clientX - scrubRef.current.offsetLeft);
        console.log('down:', isDragging);
      };

      // Sự kiện di chuyển chuột
      const mouseMove = (e) => {
        if (!isDragging) return;

        const x = e.clientX - value;
        // if(x>=)
        // Cập nhật vị trí của scrubRef.current theo di chuyển chuột
        scrubRef.current.style.left = `${x}px`;
        scrubRef.current.style.position = 'absolute';
        console.log('move');
      };

      // Sự kiện thả chuột
      const mouseUp = () => {
        setIsDragging(false);
        console.log('up:', isDragging);
      };

      scrubRef.current.addEventListener('mousedown', mouseDown);
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);

      return () => {
        scrubRef.current.removeEventListener('mousedown', mouseDown);
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
      };
    }
  }, [isDragging]);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('playhead-container')}>
        <input ref={playheadRef} className={cx('playhead')} type="range" />
      </div>
      <div ref={scrubRef} className={cx('scrub-head')}></div>
    </div>
  );
}

export default Playhead;
