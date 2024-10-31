import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import style from './PostingNotiModal.module.scss';
const cx = classNames.bind(style);

function PostingNotiModal({ progressPost = 0, modalIsOpen, handleCloseModal }) {
  const [style, setStyle] = useState();
  useEffect(() => {
    setStyle({ backgroundImage: `conic-gradient(var(--primary-color)${progressPost}%, white 0)` });
  }, [progressPost]);
  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={() => handleCloseModal}
      // style={customStyles}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className={cx('posting-noti-modal')}>
        <div style={style} className={cx('posting-pregress')}>
          <div className={cx('posting-pregress-num')}>99%</div>
        </div>
        <p className={cx('posting-title')}>Posting...</p>
        <p className={cx('posting-hint')}>Leaving the page does not interrupt the posting process</p>
      </div>
    </Modal>
  );
}

export default PostingNotiModal;
