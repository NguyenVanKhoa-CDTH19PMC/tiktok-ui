import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faClose, faQrcode, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { login } from '~/services/authServices';
import { Button } from '~/components/FormControls';
import style from './Login.module.scss';
import IconButton from '~/components/IconButton';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
Modal.setAppElement('#root');
function LoginModal({ modalIsOpen, handleCloseModal }) {
  const [viewId, setViewId] = useState([]);
  const presTitle = document.title;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });
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
  ];

  useEffect(() => {
    setViewId([]);
    if (modalIsOpen) {
      document.title = 'Log in | Tiktok';
    }
    return () => (document.title = presTitle);
  }, [modalIsOpen]);

  const onSubmit = async (data) => {
    const result = await login({ username: data.username, password: data.password });
    if (result) window.location.reload();
    else {
      setError('password', { type: 'manual', message: "Username or password doesn't match our records. Try again." });
      toast.error('Log in fail!', { position: 'top-center', autoClose: 1500 });
    }
  };

  const renderView = () => {
    switch (viewId[viewId.length - 1]) {
      case 2:
        return (
          <>
            <div className={cx('login-container')}>
              <h2 className={cx('title')}>Log in</h2>
              <form onSubmit={handleSubmit((data) => onSubmit(data))} className={cx('login-form')}>
                <label className={cx('lable-option')}>
                  Email or username <Link className={cx('other-login-options')}>Log in with phone</Link>
                </label>
                <div className={cx('input-container')}>
                  <input
                    className={cx('email-or-username-input')}
                    placeholder="Email or username"
                    {...register('username', { required: true })}
                  />
                </div>
                <div className={cx('input-container', 'last')}>
                  <input
                    className={cx('password-input', { 'error-input': errors.password })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                  <div onClick={() => setShowPassword((pre) => !pre)} className={cx('show-password')}>
                    {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </div>
                </div>
                {errors.password && <p className={cx('error-noti')}> {errors.password.message}</p>}

                <Link className={cx('forget-password-link')}>Forgot password?</Link>
                <Button type="submit" large primary disabled={!isValid} className={cx('submit-login')}>
                  {isSubmitting ? (
                    <div className={cx('loading')}>
                      <FontAwesomeIcon icon={faSpinner} />
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
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
                    <Button medium onClick={option.onClick} leftIcon={option.icon} className={cx('option-button')}>
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
      className="modal-content"
      overlayClassName="modal-overlay"
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
