const routes = {
  home: '/',
  explore: '/explore',
  following: '/following',
  friends: '/friends',
  live: '/live',
  profile: (userId) => {
    return `/${userId}`;
  },
  upload: '/upload',
  search: '/search',
  messages: '/messages',
  post: (postId) => {
    return `/video/${postId}`;
  },
};
export default routes;
