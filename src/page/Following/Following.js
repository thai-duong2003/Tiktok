import classNames from "classnames/bind";
import styles from "./Following.module.scss";
import { useContext, useEffect, useState } from "react";
import * as userServices from "~/Services/VideoService/Videoservice";

import Contentmain from "../Home/Contentmain";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import LoginRegister from "../LoginRegister/LoginRegister";
import { config } from "~/App";
import { backpage } from "../Profile/Profile";
import Image from "~/conponents/Image";
import images from "~/access/image";
import AccountItem from "~/conponents/AccountItem";
import { Suggest } from "~/Services/SuggestServices";
import { IPHTTP } from "~/utils/httprequest";
import FollowBtn from "../Profile/Follow/FollowBtn";
import RigisterUser from "../LoginRegister/rigister/rigisterUser/RigisterUser";
import SuggessFollowaccount from "./suggessFollowaccount";
const cx = classNames.bind(styles);

function Following() {
  const [video, setvideo] = useState([]);
  const [page, setpage] = useState(2);
  const { likeBtn, detailluserlogin } = useContext(Appcontext);
  const [showregister, setshowregister] = useState(false);
  const [suggeser, setsuggeser] = useState();
  document.title =
    "Following - Watch videos from creators you follow | TikTok ";
  backpage("/Tiktok/following");
  //call api get video list
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.FollowingVideoList({
        userId: detailluserlogin && detailluserlogin.id,
        page: page,
      });
      setvideo(resuilt);
      setshowregister(false);
      setsuggeser(true);
    };
    detailluserlogin && fetchApi();
  }, [page, likeBtn]);
  return (
    <div className={cx("wrapper")} style={{ width: "650px" }}>
      {config.token_login === "" || config.token_login === undefined ? (
        <SuggessFollowaccount call setshowregister={setshowregister} />
      ) : video.length > 1 ? (
        <Contentmain video={video} page={page} setpage={setpage} />
      ) : (
        suggeser && <SuggessFollowaccount call isfollow />
      )}
      {showregister && (
        <div
          className={cx("register")}
          onClick={() => {
            setshowregister(false);
          }}
        >
          <LoginRegister />
        </div>
      )}
      <RigisterUser />
    </div>
  );
}
export default Following;
