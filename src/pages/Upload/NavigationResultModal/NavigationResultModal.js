import Modal from 'react-modal';
import classNames from 'classnames/bind';
import style from './NavigationResultModal.module.scss';
import { Button } from '~/components/FormControls';
const cx = classNames.bind(style);

function NavigationResultModal({ progressPost = 0, modalIsOpen, handleCloseModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      // onRequestClose={() => handleCloseModal}
      // style={customStyles}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className={cx('navigation-result-modal')}>
        <p className={cx('navigation-result-title')}>Your video has been uploaded</p>
        <p className={cx('navigation-result-hint')}>You can manage your posts or upload another video.</p>
        <div className={cx('navigation-result-buttons')}>
          <Button to={'routes'} secondary>
            Manage posts
          </Button>
          <Button onClick={() => window.location.reload()} primary>
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default NavigationResultModal;
