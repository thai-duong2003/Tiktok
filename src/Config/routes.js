const routes = {
  home: "/Tiktok/",
  nopage: "/Tiktok/*", //danh cho nhung link ko cos thif no se di vao trang nay
  following: "/Tiktok/following",
  profile: "/Tiktok/:nickname",
  live: "/Tiktok/live",
  khampha: "/Tiktok/explore",
  videodetail: "/Tiktok/videos/:id",
  login: "/Tiktok/login",
  upload: "/Tiktok/upload",
  searchResuilpage: "/Tiktok/Searchs",
  searchUserPage: "/Tiktok/Search/users",
  searchVideoPage: "/Tiktok/Search/video",
  friendPage: "/Tiktok/friends",
};
export default routes;
