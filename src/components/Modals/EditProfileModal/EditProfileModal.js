import classNames from 'classnames/bind';
import Modal from 'react-modal';
import style from './EditProfileModal.module.scss';
import IconButton from '~/components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/hooks/AuthContext';
import { useRef, useState } from 'react';

const cx = classNames.bind(style);

function EditProfileModal({ modalIsOpen, handleCloseModal }) {
  const { isLoggedIn, authUser } = useAuth();
  const [avatarInput, setAvatarInput] = useState(authUser.image);
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
        <div className={cx('content')}>
          <div className={cx('profile-avatar')}>
            <p className={cx('title')}>Profile photo</p>
            <div className={cx('avatar-content')}>
              <div className={cx('avatar')}>
                <Avatar src={avatarInput} alt="" size={96} />
                <div className={cx('edit-avatar-button')}>
                  <label className="upload-button" htmlFor="avatar-input">
                    <FontAwesomeIcon icon={faEdit} />
                  </label>

                  <input
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatarInput(reader.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    id="avatar-input"
                    className={cx('avatar-input')}
                    type="file"
                    accept="image/*"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('username')}>
            <p className={cx('title')}>Username</p>
            <div className={cx('edit-container')}>
              <input placeholder="Username" value={authUser.username} className={cx('username-input')} />
              <p className={cx('username-review')}>www.tiktok.com/@</p>
              <p className={cx('notif')}>
                Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also
                change your profile link.
              </p>
            </div>
          </div>
          <div className={cx('fullname')}>
            <p className={cx('title')}>Name</p>
            <div className={cx('edit-container')}>
              <input value={authUser.lastName} placeholder="Name" className={cx('fullname-input')} />
              <div className={cx('notif')}>Your nickname can only be changed once every 7 days.</div>
            </div>
          </div>
          <div className={cx('bio')}>
            <div className={cx('title')}>Bio</div>
            <div className={cx('edit-container')}>
              <textarea value={authUser.email} placeholder="Bio" className={cx('bio-input')} />
              <p className={cx('limit-bio')}>0/80</p>
            </div>
          </div>
        </div>
        <div className={cx('footer')}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button primary disabled>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
