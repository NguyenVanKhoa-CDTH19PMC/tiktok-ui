import Modal from 'react-modal';
import style from './LogoutModal.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(style);
Modal.setAppElement('#root');

function LogoutModal({ modalIsOpen, handleCloseModal }) {
  const customStyles = {
    overlay: {
      backgroundColor: '#00000080',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      position: 'relative',
      padding: '0',
      height: 'fit-content',
      width: 'fit-content',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'white',
      right: 0,
      left: 0,
      bottom: 0,
      top: 0,
    },
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };
  if (!modalIsOpen) return null; // only render when isOpen

  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
      // style={customStyles}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className={cx('wrapper')}>
        <div className={cx('title')}>Are you sure you want to log out?</div>
        <div className={cx('button-wrapper')}>
          <Button onClick={handleCloseModal} large className={cx('cancel-button')}>
            Cancel
          </Button>
          <Button onClick={handleLogout} large outline className={cx('logout-button')}>
            Log out
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LogoutModal;
