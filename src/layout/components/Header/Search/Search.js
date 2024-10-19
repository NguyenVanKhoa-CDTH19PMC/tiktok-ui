import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Headlessippy from '@tippyjs/react/headless';
import style from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import { search } from '~/services/seacrhService';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

const cx = classNames.bind(style);
function Search() {
  const [seacrhResult, setSeacrhResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const searchRef = useRef();
  const [serchWidth, setSerchWidth] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const debouncedValue = useDebounce(searchValue, 500);
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (searchRef.current) {
        const newWidth = searchRef.current.offsetWidth;
        setSerchWidth(newWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSeacrhResult([]);
      return;
    }
    setLoading(true);
    const fetchApi = async () => {
      const result = await search(debouncedValue);
      setSeacrhResult(result.users);
      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);
  return (
    <Headlessippy
      onClickOutside={() => setShowResult(false)}
      appendTo={document.body}
      interactive
      visible={seacrhResult.length > 0 && showResult}
      render={(attas) => (
        <PopperWrapper>
          <div tabIndex="-1" style={{ width: serchWidth }} className={cx('search-result')}>
            <div className={cx('search-title')}>Accounts</div>
            <ul className={cx('search-list')}>
              {seacrhResult.map((data) => (
                <li className={cx('search-item')}>
                  <AccountItem data={data} key={data.id} />
                </li>
              ))}
              <li className={cx('more-results', 'search-item')}>
                <Link to={routes.search}>
                  <button className={cx('more-btn')}>View all results for "{searchValue}"</button>
                </Link>
              </li>
            </ul>
          </div>
        </PopperWrapper>
      )}
    >
      <div ref={searchRef} className={cx('search')}>
        <input
          ref={inputRef}
          onFocus={() => setShowResult(true)}
          onChange={(e) => {
            if (!e.target.value.startsWith(' ')) {
              setSearchValue(e.target.value);
            }
          }}
          type="text"
          placeholder="Search"
          value={searchValue}
        />
        {searchValue && !loading && (
          <div
            className={cx('clean')}
            onClick={() => {
              setSearchValue('');
              setSeacrhResult([]);
              inputRef.current.focus();
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        )}
        {loading && (
          <div className={cx('loading')}>
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        )}
        <button className={cx('search-btn', 'action-btn')}>
          <SearchIcon />
        </button>
      </div>
    </Headlessippy>
  );
}

export default Search;
