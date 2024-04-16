const routes = {
  home: "/",
  nopage: "*", //danh cho nhung link ko cos thif no se di vao trang nay
  following: "/following",
  profile: "/:nickname",
  live: "/live",
  khampha: "/explore",
  videodetail: "/videos/:id",
  login: "/login",
  upload: "/upload",
  searchResuilpage: "/Searchs",
  searchUserPage: "/Search/users",
  searchVideoPage: "/Search/video",
  friendPage: "/friends",
};
export default routes;
