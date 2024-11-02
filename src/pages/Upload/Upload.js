import style from './Upload.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faAt,
  faCheckCircle,
  faCloudArrowUp,
  faCropSimple,
  faFilm,
  faHashtag,
  faLocationDot,
  faRotate,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay, faFileVideo } from '@fortawesome/free-regular-svg-icons';
import { Button, CheckBox, Dropdown, ToggleSwitch } from '~/components/FormControls';
import RadioButton from '~/components/FormControls/RadioButton';
import { useEffect, useRef, useState } from 'react';
import { postFile, postPost } from '~/services/postSevices';
import { timerDisplay } from '~/utils/TimerDisplay';
import images from '~/assets/images';
import PostingNotiModal from './PostingNotiModal/PostingNotiModal';
import NavigationResultModal from './NavigationResultModal/NavigationResultModal';
const cx = classNames.bind(style);
const LOCATIONS = [
  { id: 1, title: 'Ho Chi Minh City', description: 'Vietnam' },
  { id: 2, title: 'Can Tho City', description: 'Vietnam' },
];
function Upload() {
  const [seeMore, setSeeMore] = useState(false);
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [progressFile, setProgressFile] = useState();
  const [progressPost, setProgressPost] = useState(0);
  const [showPostingNotiModal, setShowPostingNotiModal] = useState(false);
  const [showNavigationResultModal, setShowNavigationResultModal] = useState(false);

  const progressLineRef = useRef();
  const videoReviewRef = useRef();

  useEffect(() => {
    if (videoReviewRef.current) videoReviewRef.current.src = URL.createObjectURL(file);
  }, [file]);

  const remainingTime = (startTime, total, loaded) => {
    const elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
    const uploadSpeed = loaded / elapsedTime; // Tốc độ tải lên (bytes/s)

    // Tính số byte còn lại và thời gian còn lại
    const remainingBytes = total - loaded;
    return remainingBytes / uploadSpeed;
  };

  useEffect(() => {
    if (progressLineRef.current)
      progressLineRef.current.style.width = (progressFile.progress * 100).toFixed() + '%' || 0;
  }, [progressFile]);
  const postVideo = async (file) => {
    const result = await postFile(file, {
      onUploadProgress: (progressEvent) => {
        const startTime = Date.now();
        setProgressFile((pre) => {
          return {
            ...pre,
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            progress: progressEvent.progress,
            remaining: remainingTime(startTime, progressEvent.loaded, progressEvent.total) || 0,
          };
        });
      },
    });
  };
  const postPostAPI = async () => {
    const result = await postPost(
      { title: description },
      {
        onUploadProgress: (progressEvent) => {
          setProgressPost(progressEvent.progress * 100);
          setShowPostingNotiModal(true);
        },
      },
    );
    setShowPostingNotiModal(false);
    setShowNavigationResultModal(true);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {file ? (
          <>
            <div className={cx('file-information-container')}>
              <span className={cx('file-name')}>{file.name}</span>
              <div className={cx('file-detail')}>
                <span className={cx('detail-item')}>
                  Size:<strong>{(file.size / 1024 / 1024).toFixed(2) + ' MB'}</strong>
                </span>
                <span className={cx('detail-item')}>
                  Duration:<strong> {timerDisplay(videoReviewRef.current?.duration)}</strong>
                </span>
              </div>
              <div className={cx('state-video', { 'done-state': progressFile?.progress == 1 })}>
                <i className={cx('state-icon')}>
                  {progressFile?.progress == 1 ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : (
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  )}
                </i>
                <div className={cx('state-text')}>
                  {progressFile?.progress == 1
                    ? ' Uploaded'
                    : `${(progressFile?.loaded / 1024).toFixed(2)} KB/${(progressFile?.total / 1024 / 1024).toFixed(
                        2,
                      )} MB
                    uploaded ${progressFile?.remaining?.toFixed()} seconds left`}
                </div>
              </div>
              <div
                ref={progressLineRef}
                className={cx('progress-line', { 'done-state': progressFile?.progress == 1 })}
              ></div>
              <Button leftIcon={<FontAwesomeIcon icon={faRotate} />} secondary className={cx('replace-button')}>
                Replace
              </Button>
              <span className={cx('progress-num')}>
                {(progressFile?.progress * 100 || 0).toFixed(progressFile?.progress == 1 ? 0 : 2) + '%'}
              </span>
            </div>
            <div className={cx('post-information')}>
              <div className={cx('post-form')}>
                <div className={cx('input-container')}>
                  <p className={cx('title')}>Description</p>
                  <div className={cx('description-input')}>
                    <textarea
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder="Share more about your video heare..."
                    ></textarea>
                    <div className={cx('caption')}>
                      <div className={cx('action')}>
                        <div className={cx('action-item')}>
                          <i className={cx('icon-action')}>
                            <FontAwesomeIcon icon={faHashtag} />
                          </i>
                          <span className={cx('title-action')}>Hashtags</span>
                        </div>
                        <div className={cx('action-item')}>
                          <i className={cx('icon-action')}>
                            <FontAwesomeIcon icon={faAt} />
                          </i>
                          <span className={cx('title-action')}>Hashtags</span>
                        </div>
                      </div>
                      <div className={cx('word-count')}>{description?.length || 0}/4000</div>
                    </div>
                  </div>
                </div>
                <div className={cx('input-container')}>
                  <p className={cx('title')}>Cover</p>
                </div>
                <div className={cx('input-container')}>
                  <p className={cx('title')}>Location</p>
                  <Dropdown
                    data={LOCATIONS}
                    search
                    caret={false}
                    icon={<FontAwesomeIcon icon={faLocationDot} />}
                    placeholder="Search location"
                    onDropdownSelect={(demo) => console.log(demo)}
                  />
                  <div className={cx('locations-recomment')}>
                    <div className={cx('locations-recomment-item')}>Ho chi minh</div>
                  </div>
                </div>
                <div className={cx('input-container')}>
                  <p className={cx('title')}>Who can watch this video</p>
                  <Dropdown
                    data={[
                      { id: 1, title: 'Everyone' },
                      { id: 2, title: 'Friends', description: 'Follower you follow back' },
                      { id: 3, title: 'Only you' },
                    ]}
                    defaultValue={{ id: 1, title: 'Everyone' }}
                    onDropdownSelect={(demo) => console.log(demo)}
                  />
                </div>
                <div className={cx('input-container')}>
                  <p className={cx('title')}>When to post</p>
                  <div className={cx('radio-input')}>
                    {[
                      { id: 1, title: 'Now', selected: true },
                      { id: 2, title: 'Schedule' },
                    ].map((item) => (
                      <div key={item.id} className={cx('radio-input-item')}>
                        <RadioButton
                          selected={item.selected}
                          disabled={false}
                          name="time-post"
                          value={item.id}
                          onSelect={(data) => console.log(data)}
                          className={cx('radio-button')}
                        >
                          {item.title}
                        </RadioButton>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={cx('input-container', 'copyright-check')}>
                  <p className={cx('title')}>Run a copyright check</p>
                  <ToggleSwitch />
                </div>
                <div className={cx('input-container')}>
                  <div onClick={() => setSeeMore((pre) => !pre)} className={cx('title', 'see-more-button')}>
                    {seeMore ? 'Seel less' : 'See more'}
                    <div className={cx('icon')}>
                      {!seeMore ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}
                    </div>
                  </div>
                  {seeMore ? (
                    <div className={cx('see-more-content')}>
                      <div className={cx('input-container')}>
                        <p className={cx('title')}>Allow users to:</p>
                        <div className={cx('checkbox-input')}>
                          {[
                            { id: 1, title: 'Comment' },
                            { id: 2, title: 'Duet', disabled: true },
                            { id: 3, title: 'Stitch', disabled: true },
                          ].map((item) => (
                            <CheckBox disabled={item.disabled} value={item.id} onCheck={(data) => console.log(data)}>
                              {item.title}
                            </CheckBox>
                          ))}
                        </div>
                        <div className={cx('more-tip')}>Duet and Stitch not available for videos over 60s</div>
                      </div>
                    </div>
                  ) : (
                    <div className={cx('more-tip')}>Content disclosure and other advanced settings</div>
                  )}
                </div>
                <div className={cx('form-divider')}></div>
                <div className={cx('form-fooder')}>
                  <Button onClick={() => postPostAPI()} disabled={!file} moreRadius large primary>
                    Post
                  </Button>
                  <Button moreRadius large secondary>
                    Discard
                  </Button>
                </div>
              </div>
              <div className={cx('post-review-container')}>
                <div className={cx('post-review-content')}>
                  <img className={cx('frame-review')} src={images.framePhone} />
                  <video className={cx('video-review')} ref={videoReviewRef} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={cx('upload-container')}>
              <div className={cx('upload-card')}>
                <label className={cx('upload-card-content')} htmlFor="file">
                  <div className={cx('upload-icon')}>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </div>
                  <div className={cx('upload-title')}>Select video to upload</div>
                  <div className={cx('upload-description')}>Or drag and drop it here</div>
                  <Button primary className={cx('upload-button')}>
                    Select video
                  </Button>
                </label>
                <input
                  onChange={(e) => {
                    postVideo(e.target.files[0]);
                    setFile(e.target.files[0]);
                  }}
                  className={cx('upload-input')}
                  id="file"
                  type="file"
                />
              </div>

              <div className={cx('video-suggetion')}>
                <div className={cx('suggetion-item')}>
                  <div className={cx('suggetion-icon')}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </div>
                  <div className={cx('suggetion-content')}>
                    <p className={cx('suggetion-title')}>Size and duration</p>
                    <p className={cx('suggetion-description')}>Maximum size: 10 GB, video duration: 60 minutes.</p>
                  </div>
                </div>
                <div className={cx('suggetion-item')}>
                  <div className={cx('suggetion-icon')}>
                    <FontAwesomeIcon icon={faFileVideo} />
                  </div>

                  <div className={cx('suggetion-content')}>
                    <p className={cx('suggetion-title')}>File formats</p>
                    <p className={cx('suggetion-description')}>
                      Recommended: “.mp4”. Other major formats are supported.
                    </p>
                  </div>
                </div>
                <div className={cx('suggetion-item')}>
                  <div className={cx('suggetion-icon')}>
                    <FontAwesomeIcon icon={faFilm} />
                  </div>
                  <div className={cx('suggetion-content')}>
                    <p className={cx('suggetion-title')}>Video resolutions</p>
                    <p className={cx('suggetion-description')}>Minimum resolution: 720p. 2K and 4K are supported.</p>
                  </div>
                </div>
                <div className={cx('suggetion-item')}>
                  <div className={cx('suggetion-icon')}>
                    <FontAwesomeIcon icon={faCropSimple} />
                  </div>
                  <div className={cx('suggetion-content')}>
                    <p className={cx('suggetion-title')}>Aspect ratios</p>
                    <p className={cx('suggetion-description')}>Recommended: 16:9 for landscape, 9:16 for vertical.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('capcut-container')}>
              <div className={cx('capcut-content')}>
                <p className={cx('title')}>Create high quality videos on CapCut Online</p>
                <p className={cx('discription')}>
                  Automatically shorten your videos and create videos from scripts with AI-powered features.
                </p>
              </div>
              <div className={cx('captut-button')}>
                <Button leftIcon={<FontAwesomeIcon icon={faVideo} />} secondary>
                  Try now
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <PostingNotiModal
        progressPost={progressPost}
        modalIsOpen={showPostingNotiModal}
        handleCloseModal={() => setShowPostingNotiModal(false)}
      />
      <NavigationResultModal modalIsOpen={showNavigationResultModal} />
    </div>
  );
}

export default Upload;
