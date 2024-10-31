import classNames from 'classnames/bind';
import Modal from 'react-modal';
import style from './EditProfileModal.module.scss';
import IconButton from '~/components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Avatar from '~/components/Avatar';
import { Button } from '~/components/FormControls';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/hooks/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateProfile } from '~/services/authServices';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

function EditProfileModal({ modalIsOpen, handleCloseModal }) {
  const { isLoggedIn, authUser } = useAuth();
  const [avatarInput, setAvatarInput] = useState(authUser.image);
  const [username, setUserName] = useState(authUser.username);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isValidating },
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: authUser.username,
      fullname: authUser.lastName,
      bio: authUser.email,
      avatar: authUser.image,
    },
  });

  const onSubmit = async (data) => {
    if (isDirty) {
      const result = await updateProfile(authUser.id, { lastName: data.fullname });
      // localStorage.setItem('updateProfile', 'success');
      navigate(0);
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h1 className={cx('title-header')}> Edit profile</h1>
          <IconButton onClick={handleCloseModal} icon={<FontAwesomeIcon icon={faClose} />} />
        </div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className={cx('content')}>
            <div className={cx('profile-avatar')}>
              <p className={cx('title')}>Profile photo</p>
              <div className={cx('avatar-content')}>
                <div className={cx('avatar')}>
                  <Avatar className={cx('avatar-image')} htmlFor="avatar-input" src={avatarInput} alt="" size={96} />
                  <div className={cx('edit-avatar-button')}>
                    <label className="upload-button" htmlFor="avatar-input">
                      <FontAwesomeIcon icon={faEdit} />
                    </label>

                    <input
                      id="avatar-input"
                      className={cx('avatar-input')}
                      type="file"
                      accept="image/*"
                      {...register('avatar')}
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAvatarInput(reader.result);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('username')}>
              <p className={cx('title')}>Username</p>
              <div className={cx('edit-container')}>
                <input
                  placeholder="Username"
                  className={cx('username-input', { 'error-input': errors.username })}
                  {...register('username', {
                    required: { value: true, message: 'Include at least 2 characters in your username' },
                  })}
                />
                {errors.username && <p className={cx('error-noti')}>{errors.username.message}</p>}
                <p className={cx('username-review')}>www.tiktok.com/@{username}</p>
                <p className={cx('notif')}>
                  Usernames can only contain letters, numbers, underscores, and periods. Changing your username will
                  also change your profile link.
                </p>
              </div>
            </div>
            <div className={cx('fullname')}>
              <p className={cx('title')}>Name</p>
              <div className={cx('edit-container')}>
                <input placeholder="Name" className={cx('fullname-input')} {...register('fullname')} />
                <div className={cx('notif')}>Your nickname can only be changed once every 7 days.</div>
              </div>
            </div>
            <div className={cx('bio')}>
              <div className={cx('title')}>Bio</div>
              <div className={cx('edit-container')}>
                <textarea
                  placeholder="Bio"
                  className={cx('bio-input', { 'error-input': errors.bio })}
                  {...register('bio', { maxLength: 80 })}
                />
                <p className={cx('limit-bio')}>
                  <span className={cx({ 'error-limit-bio': errors.bio })}>{getValues('bio').length}</span>/80
                </p>
              </div>
            </div>
          </div>
          <div className={cx('footer')}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" primary disabled={!isDirty || !isValid}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
