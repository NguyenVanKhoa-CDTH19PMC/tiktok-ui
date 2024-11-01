import { HeaderOnly } from '~/layout';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Upload from '~/pages/Upload';
import { config } from '~/config';
import PostDetail from '~/pages/PostDetail';
import Profile from '~/pages/Profile';
import StudioLayout from '~/layout/StudioLayout';
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.explore, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.friends, component: Home },
  { path: config.routes.live, component: Home },
  { path: config.routes.profile(':userId'), component: Profile },
  { path: config.routes.search, component: Search },
  { path: config.routes.post(':postId'), component: PostDetail, layout: null },
  { path: config.routes.upload, component: Upload, layout: StudioLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
