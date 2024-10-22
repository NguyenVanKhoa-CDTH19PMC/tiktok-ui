import { HeaderOnly } from '~/layout';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';
import { config } from '~/config';
import PostDetail from '~/pages/PostDetail';
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.explore, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.friends, component: Home },
  { path: config.routes.live, component: Home },
  { path: config.routes.profile, component: Home },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.post(':username', ':postId'), component: PostDetail, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
