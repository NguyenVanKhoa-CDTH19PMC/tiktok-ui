import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Button from '~/components/Button';
import style from './Login.module.scss';
import IconButton from '~/components/IconButton';
const cx = classNames.bind(style);
Modal.setAppElement('#root');
function LoginModal({ modalIsOpen, closeModal }) {
  const LOGIN_OPTIONS = [
    {
      title: 'Use QR code',
      icon: <FontAwesomeIcon icon={faQrcode} />,
    },
    {
      title: 'Use phone / email / username',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      title: 'Use QR code',
      icon: <FontAwesomeIcon icon={faQrcode} />,
    },
    {
      title: 'Use phone / email / username',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      title: 'Use QR code',
      icon: <FontAwesomeIcon icon={faQrcode} />,
    },
    {
      title: 'Use phone / email / username',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      title: 'Use QR code',
      icon: <FontAwesomeIcon icon={faQrcode} />,
    },
    {
      title: 'Use phone / email / username',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];
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
      // border: 'none',
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

  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      // className="modal-content"
      // overlayClassName="modal-overlay"
      contentLabel="Example Modal"
    >
      <div className={cx('wrapper')}>
        <div className={cx('close-modal')}>
          <IconButton icon={<FontAwesomeIcon icon={faClose} onClick={closeModal} />} />
        </div>
        <div className={cx('login-container')}>
          <h2 className={cx('title')}>Log in to TikTok</h2>
          <div className={cx('login-options-container')}>
            {LOGIN_OPTIONS.map((option, index) => (
              <div key={index}>
                <Button leftIcon={option.icon} className={cx('option-button')}>
                  {option.title}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div onClick={closeModal} className={cx('agreement')}>
          By continuing with an account located in Vietnam, you agree to our Terms of Service and acknowledge that you
          have read our Privacy Policy.
        </div>

        <div className={cx('signup-link')}>
          Don’t have an account? <Link className={cx('signup-link-button')}>Sign up</Link>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
