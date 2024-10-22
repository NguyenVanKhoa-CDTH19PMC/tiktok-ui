const routes = {
  home: '/',
  explore: '/explore',
  following: '/following',
  friends: '/friends',
  live: '/live',
  profile: '/:profile',
  upload: '/upload',
  search: '/search',
  post: (username, postId) => {
    return `/${username}/video/${postId}`;
  },
};
export default routes;
