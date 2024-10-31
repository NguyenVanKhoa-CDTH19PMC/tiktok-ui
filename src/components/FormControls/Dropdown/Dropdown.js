import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TippyHeadless from '@tippyjs/react/headless';
import style from './Dropdown.module.scss';
import classNames from 'classnames/bind';
import { faAngleDown, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(style);
function Dropdown({ data = [], icon, defaultValue, placeholder, search, caret = true, onDropdownSelect }) {
  const [selected, setSelected] = useState({ ...defaultValue });
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();
  const [valueInput, setValueInput] = useState();
  const handleClick = () => {
    setVisible(true);
  };
  const handleClickOutside = () => {
    setVisible(false);
  };
  return (
    <div className={cx('wrapper')}>
      <TippyHeadless
        placement="bottom"
        visible={visible}
        onClickOutside={handleClickOutside}
        interactive
        render={() => (
          <div className={cx('dropdown-content')}>
            {data.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  if (option === selected) return;
                  setSelected(option);
                  setVisible(false);

                  inputRef.current.value = option.title;
                  onDropdownSelect(option);
                }}
                className={cx('dropdown-item')}
              >
                <div className={cx('item-content')}>
                  <p className={cx('item-title')}>{option.title}</p>
                  <p className={cx('item-description')}>{option.description}</p>
                </div>
                {selected?.id === option?.id && (
                  <div className={cx('selected')}>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      >
        <div onClick={handleClick} className={cx('input-container')}>
          {icon && <div className={cx('icon')}>{icon}</div>}
          <input
            defaultValue={selected?.title}
            // value={selected?.title || null}
            onFocus={(e) => {
              if (search) e.target.value = valueInput || null;
            }}
            onBlur={(e) => {
              if (search) e.target.value = selected.title || null;
            }}
            readOnly={!search}
            className={cx('input')}
            type="text"
            placeholder={placeholder}
            ref={inputRef}
            onChange={(e) => setValueInput(e.target.value)}
          />
          {search && selected.id && (
            <div
              onClick={(e) => {
                setSelected({});
                setVisible(false);

                inputRef.current.value = '';
              }}
              className={cx('clear')}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
          )}
          {caret && (
            <div className={cx('caret')}>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          )}
        </div>
      </TippyHeadless>
    </div>
  );
}
Dropdown.prototype = {
  data: PropTypes.array.isRequired,
  onDropdownSelect: PropTypes.func.isRequired,
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  search: PropTypes.bool,
};
export default Dropdown;
