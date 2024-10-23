import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faClose, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { getAuthUser, login } from '~/services/authServices';
import Button from '~/components/Button';
import style from './Login.module.scss';
import IconButton from '~/components/IconButton';
import { computeHeadingLevel } from '@testing-library/react';
const cx = classNames.bind(style);
Modal.setAppElement('#root');
function LoginModal({ modalIsOpen, handleCloseModal }) {
  const [viewId, setViewId] = useState([]);
  const presTitle = document.title;
  const usernameInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const LOGIN_OPTIONS = [
    {
      id: 1,
      title: 'Use QR code',
      icon: <FontAwesomeIcon icon={faQrcode} />,
    },
    {
      id: 2,
      title: 'Use phone / email / username',
      icon: <FontAwesomeIcon icon={faUser} />,
      onClick: () => {
        setViewId((pre) => [...pre, 2]);
      },
    },
    { id: 3, title: 'Continute with Facebook', icon: <FontAwesomeIcon icon={faFacebook} /> },
    // {
    //   title: 'Use phone / email / username',
    //   icon: <FontAwesomeIcon icon={faUser} />,
    // },
    // {
    //   title: 'Use QR code',
    //   icon: <FontAwesomeIcon icon={faQrcode} />,
    // },
    // {
    //   title: 'Use phone / email / username',
    //   icon: <FontAwesomeIcon icon={faUser} />,
    // },
    // {
    //   title: 'Use QR code',
    //   icon: <FontAwesomeIcon icon={faQrcode} />,
    // },
    // {
    //   title: 'Use phone / email / username',
    //   icon: <FontAwesomeIcon icon={faUser} />,
    // },
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
  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);
  useEffect(() => {
    // setViewId([]);

    if (modalIsOpen) {
      document.title = 'Log in | Tiktok';
    }
    return () => (document.title = presTitle);
  }, [modalIsOpen]);
  const fetchLogin = async () => {
    const result = await login({ username: usernameInput, password: passwordInput });
    window.location.reload();
  };

  const renderView = () => {
    switch (viewId[viewId.length - 1]) {
      case 2:
        return (
          <>
            <div className={cx('login-container')}>
              <h2 className={cx('title')}>Log in</h2>
              <div className={cx('login-form')}>
                <label className={cx('lable-option')}>
                  Email or username <Link className={cx('other-login-options')}>Log in with phone</Link>
                </label>
                <div className={cx('input-container')}>
                  <input
                    name="username"
                    ref={usernameInputRef}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className={cx('email-or-username-input')}
                    placeholder="Email or username"
                  />
                </div>
                <div className={cx('input-container')}>
                  <input
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={cx('password-input')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <button onClick={() => setShowPassword((pre) => !pre)} className={cx('show-password')}>
                    {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </button>
                </div>
                <Link className={cx('forget-password-link')}>Forgot password?</Link>
                <Button
                  onClick={() => fetchLogin()}
                  type="submit"
                  large
                  primary
                  disabled={!passwordInput | !usernameInput}
                  className={cx('submit-login')}
                >
                  Login
                </Button>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className={cx('login-container')}>
              <h2 className={cx('title')}>Log in to TikTok</h2>
              <div className={cx('login-options-container')}>
                {LOGIN_OPTIONS.map((option, index) => (
                  <div key={index}>
                    <Button onClick={option.onClick} leftIcon={option.icon} className={cx('option-button')}>
                      {option.title}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={handleCloseModal} className={cx('agreement')}>
              By continuing with an account located in Vietnam, you agree to our Terms of Service and acknowledge that
              you have read our Privacy Policy.
            </div>
          </>
        );
    }
  };
  if (!modalIsOpen) return null; // only render when isOpen
  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      style={customStyles}
      // className="modal-content"
      // overlayClassName="modal-overlay"
      contentLabel="Example Modal"
    >
      <div className={cx('wrapper')}>
        <div className={cx('close-modal')}>
          <IconButton icon={<FontAwesomeIcon icon={faClose} onClick={handleCloseModal} />} />
        </div>

        {viewId[viewId.length - 1] && (
          <div className={cx('back')}>
            <IconButton
              icon={<FontAwesomeIcon icon={faAngleLeft} onClick={() => setViewId((pre) => pre.slice(0, -1))} />}
            />
          </div>
        )}
        {renderView()}
        <div className={cx('signup-link')}>
          Don’t have an account? <a className={cx('signup-link-button')}>Sign up</a>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
