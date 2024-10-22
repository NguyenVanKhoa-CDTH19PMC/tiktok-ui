import { faAnglesUp, faFlag, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/components/Popper/Menu';
import ToggleSwitch from '~/components/ToggleSwitch';
import classNames from 'classnames/bind';
import style from './PostMoreActionsMenu.module.scss';
const cx = classNames.bind(style);

function PostMoreActionsMenu({ children, dark }) {
  const ACTION_MORE = [
    {
      icon: <FontAwesomeIcon icon={faAnglesUp} />,
      title: 'Auto srcoll',
      extraElement: <ToggleSwitch />,
    },
    {
      icon: <FontAwesomeIcon icon={faFlag} />,
      title: 'Not interested',
    },
    {
      icon: <FontAwesomeIcon icon={faHeartBroken} />,
      title: 'Report',
    },
  ];
  return (
    <Menu dark={dark} data={ACTION_MORE}>
      {children}
    </Menu>
  );
}

export default PostMoreActionsMenu;
