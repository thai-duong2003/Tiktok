import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { useContext, useEffect, useState } from "react";
import * as userServices from "~/Services/VideoService/Videoservice";
import Contentmain from "../Home/Contentmain";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { backpage } from "../Profile/Profile";
import SuggessFollowaccount from "../Following/suggessFollowaccount";
const cx = classNames.bind(styles);
function Friend({}) {
  const [video, setvideo] = useState([]);
  const [page, setpage] = useState(1);
  const [showsugess, setshowsugess] = useState(false);
  const { likeBtn, detailluserlogin } = useContext(Appcontext);

  document.title = "TikTok - Make Your Day";
  backpage("/Tiktok/friends");
  //call api get video list
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.FriendVideoList({
        userId: detailluserlogin && detailluserlogin.id,
        page: page,
      });
      setvideo(resuilt);
      setshowsugess(true);
    };
    detailluserlogin && fetchApi();
  }, [page, likeBtn]);

  return (
    <div className={cx("wrapper")} style={{ width: "650px" }}>
      {video.length > 1 ? (
        <Contentmain video={video} page={page} setpage={setpage} />
      ) : (
        showsugess && <SuggessFollowaccount call />
      )}
    </div>
  );
}
export default Friend;
