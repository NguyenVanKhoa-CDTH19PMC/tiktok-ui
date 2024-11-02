import PropTypes from 'prop-types';
import style from './Input.module.scss';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import EmoijTable from '~/components/EmoijTable';
const cx = classNames.bind(style);
const Input = forwardRef(({ placeholder, value, tag = false, emoij = false, onChange = () => {} }, ref) => {
  const addTag = () => {
    //identify mouse position
    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;

    // insert "@" in mouse position
    const before = ref.current.value.substring(0, start);
    const after = ref.current.value.substring(end);
    ref.current.value = before + ` @ ` + after;
    // tranlate present mouse
    ref.current.setSelectionRange(start + 2, start + 2);
    ref.current.focus();
  };
  const addEmoij = (emoij) => {
    //identify mouse position
    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;

    // insert emoij in mouse position
    const before = ref.current.value.substring(0, start);
    const after = ref.current.value.substring(end);
    ref.current.value = before + emoij.character + after;
    // tranlate present mouse
    ref.current.setSelectionRange(start + emoij.character.length, start + emoij.character.length);
    ref.current.focus();
  };
  return (
    <div className={cx('comment-input-container')}>
      <input
        value={value}
        onChange={(e) => onChange(e)}
        ref={ref}
        placeholder={placeholder}
        className={cx('comment-input')}
      />

      {tag && (
        <Tippy content={`“@” a user to tag them in your comments`}>
          <button
            onClick={() => {
              addTag();
            }}
            className={cx('mention-button')}
          >
            <FontAwesomeIcon icon={faAt} />
          </button>
        </Tippy>
      )}
      {emoij && (
        <EmoijTable pushEmoijSelected={(emoij) => addEmoij(emoij)}>
          <Tippy content="Click to add emojis">
            <button className={cx('emoji-button')}>
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
          </Tippy>
        </EmoijTable>
      )}
    </div>
  );
});
Input.prototype = {};
export default Input;
