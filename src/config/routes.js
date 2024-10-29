const routes = {
  home: '/',
  explore: '/explore',
  following: '/following',
  friends: '/friends',
  live: '/live',
  profile: (userId) => {
    return `/user/${userId}`;
  },
  upload: '/upload',
  search: '/search',
  messages: '/messages',
  post: (postId) => {
    return `/video/${postId}`;
  },
  upload: '/tiktokstudio/upload',
};
export default routes;
