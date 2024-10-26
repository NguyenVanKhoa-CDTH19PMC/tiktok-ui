import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Empty from '~/components/Empty';

function FavoritesTab() {
  return (
    <Empty
      icon={<FontAwesomeIcon icon={faBookmark} />}
      title="Favorite posts"
      decription="Your favorite posts will appear here."
    />
  );
}

export default FavoritesTab;
