import classNames from "classnames/bind";
import styles from "./Following.module.scss";
import { useContext, useEffect, useState } from "react";
import * as userServices from "~/Services/VideoService/Videoservice";
import Image from "~/conponents/Image";
import AccountItem from "~/conponents/AccountItem";
import { IPHTTP } from "~/utils/httprequest";
import { Suggest } from "~/Services/SuggestServices";
import { config } from "~/App";
import FollowBtn from "../Profile/Follow/FollowBtn";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
const cx = classNames.bind(styles);

function SuggessFollowaccount({
  setshowregister,
  call = false,
  isfollow = false,
}) {
  const { likeBtn, detailluserlogin } = useContext(Appcontext);
  const [suggesteUsers, setsuggesteUsers] = useState([]);
  const [page, setpage] = useState(2);

  //call api Suggest list

  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await Suggest({
        page: page,
      });
      setsuggesteUsers(resuilt);
    };
    if (config.token_login === "" || call) {
      fetchApi();
    }
  }, [page, detailluserlogin]);
  return (
    <div className={cx("suggestfollow", "container")} onClick={() => {}}>
      <div className={cx("row")}>
        {suggesteUsers
          ? suggesteUsers.map((item, index) => {
              return (
                <div className={cx(" ", "col-xl-4")} key={index}>
                  <div className={cx("item")}>
                    <div className={cx("bgk_img")}>
                      <Image src={IPHTTP + item.avatar}></Image>
                    </div>
                    <div className={cx("user")}>
                      <AccountItem data={item} className="following_page" />
                      <span
                        onClick={() => {
                          setshowregister && setshowregister(true);
                        }}
                      >
                        <FollowBtn
                          followingUserId={isfollow && item.id}
                          primary
                        >
                          Follow
                        </FollowBtn>
                      </span>
                    </div>
                    <div className={cx("overlay")}></div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
export default SuggessFollowaccount;
