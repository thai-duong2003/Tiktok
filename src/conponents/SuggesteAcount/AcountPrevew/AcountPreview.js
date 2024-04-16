import styles from "./AcountPreview.module.scss";
import classNames from "classnames/bind";
import Image from "~/conponents/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { IPHTTP } from "~/utils/httprequest";
import FollowBtn from "~/page/Profile/Follow/FollowBtn";
import { useContext } from "react";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { CheckArray } from "~/page/Home/Checkfollow";

const cx = classNames.bind(styles);

function AccountPreview({ data, bodyshow = false }) {
  const { followinguserlist, detailluserlogin } = useContext(Appcontext);
  const check_follow = CheckArray(
    followinguserlist && followinguserlist,
    data && data.id
  );
  return (
    <div className={cx("wrapper", { bodyshow })}>
      <div className={cx("header")}>
        <Image className={cx("avata")} src={IPHTTP + data.avatar} alt="" />
        <div>
          {detailluserlogin.id === data.id ? (
            ""
          ) : (
            <FollowBtn
              outline={bodyshow}
              primary={!bodyshow}
              followingUserId={data.id}
              className={cx("following-btn")}
            >
              {check_follow ? "Flollowing" : "Flollow"}
            </FollowBtn>
          )}
        </div>
      </div>
      <div className={cx("body")}>
        <p className={cx("nickname")}>
          <strong>{data.nickname}</strong>
          {data.tick === "true" && (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          )}
        </p>
        <p className={cx("name")}>{data.name}</p>
        <p className={cx("anakytics")}>
          <strong className={cx("value")}>{data.follower_counts}</strong>
          <span className={cx("lable")}>Followers</span>
          <strong className={cx("value")}>{data.like_counts}</strong>
          <span className={cx("lable")}>Likes</span>
        </p>
        {bodyshow && <p className={cx("slogan")}>{data.bio}</p>}
      </div>
    </div>
  );
}
export default AccountPreview;
