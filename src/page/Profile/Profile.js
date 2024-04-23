import {
  faEllipsis,
  faLock,
  faPenToSquare,
  faSdCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import classNames from "classnames/bind";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Await, Link } from "react-router-dom";
import Baocaoblock from "~/conponents/baocaoblock";
import { detailluserlogin } from "~/layouts/Conponent/Header/Header";
import Button from "~/conponents/Button";
import {
  Lockicon,
  PlaypathIcon,
  Sharepathicon,
  UnfollowIcon,
  UserTiktok,
} from "~/conponents/Icon/Icon";
import { Wrapper } from "~/conponents/popper";
import Shareblock from "~/conponents/Videobtnactive/Shareblock";
import VideoTag from "~/conponents/VideoTag";

import * as profileservice from "~/Services/profileService";
import { IPHTTP } from "~/utils/httprequest";
import Image from "~/conponents/Image";
import styles from "./Profile.module.scss";
import images from "~/access/image";
import LoginRegister from "../LoginRegister/LoginRegister";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import FollowList from "./Follow/FollowList";
import FollowBtn from "./Follow/FollowBtn";
import { CheckArray } from "../Home/Checkfollow";
import EditProfile from "./EditProfile/EditProfile";

export let profilepage = { istrue: true, page: "/Tiktok/" };

const cx = classNames.bind(styles);
export function backpage(page) {
  profilepage.page = page;
  // profilepage.istrue = false;
}
function Profile() {
  const [isvideo, setisvideo] = useState(true);
  const [nickuser, setnickuser] = useState({ videos: [] });
  const [showRegister, setshowRegister] = useState(false);
  const [follolist, setfollolist] = useState(false);
  const [followtype, setfollowtype] = useState("");
  const [showEditaccount, setshowEditaccount] = useState(false);

  const { search_user_click, detailluserlogin, followinguserlist, recallapi } =
    useContext(Appcontext);

  const isfollow = false;
  const video = () => setisvideo(true);
  const lock = () => setisvideo(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resuilt = await profileservice.getaUser(search_user_click);
        setnickuser(resuilt);
      } catch {
        setnickuser("");
      }
    };
    fetchApi();
  }, [search_user_click, recallapi]);
  nickuser && backpage(`/Tiktok/@${nickuser.nickname}`);

  nickuser &&
    (document.title = `${nickuser.name} (@${nickuser.nickname}) | TikTok`);

  // console.log(nickuser);
  // console.log(detailluserlogin);
  const check_follow = CheckArray(
    followinguserlist && followinguserlist,
    nickuser && nickuser.id
  );
  const handleclickshowRegister = () => {
    if (detailluserlogin !== "") {
      setshowRegister(false);
    } else {
      setshowRegister(true);
    }
  };
  const handleshowFollowlist = () => {
    if (follolist) {
      setfollolist(false);
    } else {
      setfollolist(true);
    }
  };
  const handleshowEditaccount = () => {
    if (showEditaccount) {
      setshowEditaccount(false);
    } else {
      setshowEditaccount(true);
    }
  };
  const hideshowRegister = () => {
    if (showRegister) {
      setshowRegister(false);
    }
  };
  if (detailluserlogin) {
    // ẩn register sau khi dang nhap thanh cong
    hideshowRegister();
  }

  return (
    <div className={cx("wrapper")}>
      {nickuser === undefined ? (
        <div className={cx("nofinduser")}>
          <UserTiktok />
          <h1>Không thể tìm thấy tài khoản này</h1>
          <p>
            Bạn đang tìm kiếm video? Hãy thử duyệt tìm các tác giả, hashtag và
            âm thanh thịnh hành của chúng tôi.
          </p>
        </div>
      ) : (
        <>
          <div className={cx("profileAcount")}>
            <div className={cx("description")}>
              <div className={cx("info")}>
                {nickuser.avatar === "" ? (
                  <img src={images.noImg}></img>
                ) : (
                  // <img src={IPHTTP + nickuser.avatar}></img>
                  <Image src={IPHTTP + nickuser.avatar}></Image>
                )}
                <div>
                  <div className={cx("nick")}>
                    <h2>{nickuser.nickname}</h2>
                    <p>{nickuser.name}</p>
                  </div>

                  <div
                    className={cx("btn", "follow")}
                    onClick={handleclickshowRegister}
                  >
                    {detailluserlogin && detailluserlogin.id === nickuser.id ? (
                      // nút follower của curent user
                      <span
                        className={cx("editprofile")}
                        onClick={handleshowEditaccount}
                      >
                        <Button
                          lefticon={<FontAwesomeIcon icon={faPenToSquare} />}
                        >
                          Edit profile
                        </Button>
                      </span>
                    ) : (
                      <Fragment>
                        {check_follow ? (
                          <Button outline>Messages</Button>
                        ) : (
                          <FollowBtn
                            followingUserId={nickuser.id}
                            outline
                            className={"small"}
                          >
                            Follower
                          </FollowBtn>
                        )}

                        {check_follow && (
                          <Tippy
                            content="Unfollow"
                            placement="bottom"
                            delay={[0, 200]}
                          >
                            <div className={cx("unfollow")}>
                              <FollowBtn
                                followingUserId={nickuser.id}
                                className={"small"}
                              >
                                <UnfollowIcon />
                              </FollowBtn>
                            </div>
                          </Tippy>
                        )}
                      </Fragment>
                    )}
                  </div>

                  {showRegister && (
                    <div
                      className={cx("register")}
                      onClick={() => {
                        setshowRegister(false);
                      }}
                    >
                      <LoginRegister />
                    </div>
                  )}
                </div>
              </div>
              <div className={cx("active")}>
                <p>
                  <span>{nickuser.following_counts}</span>
                  <span
                    className={cx("active_title")}
                    onClick={() => {
                      handleshowFollowlist();
                      setfollowtype(1);
                    }}
                  >
                    Đang Follow
                  </span>
                  <span>{nickuser.follower_counts}</span>
                  <span
                    className={cx("active_title")}
                    onClick={() => {
                      handleshowFollowlist();
                      setfollowtype(2);
                    }}
                  >
                    Follower
                  </span>
                  <span>{nickuser.like_counts}</span>
                  <span className={cx("active_title", "likes")}>Thích</span>
                </p>
                <p className={cx("slogan")}>{nickuser.bio}</p>
              </div>
            </div>
            <div className={cx("opption")}>
              <span>
                <Tippy
                  interactive
                  placement="bottom-end"
                  hideOnClick={false}
                  delay={[0, 500]}
                  offset={[20, 10]}
                  render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                      <Wrapper className={cx("menu-popper")}>
                        <Shareblock />
                      </Wrapper>
                    </div>
                  )}
                >
                  <span>
                    <Sharepathicon />
                  </span>
                </Tippy>
              </span>

              <Baocaoblock />
            </div>
          </div>
          <div className={cx("videoblock")}>
            <div className={cx("buttontab")}>
              <div className={cx("btn")} onClick={video}>
                <Button>Video</Button>
              </div>
              <div className={cx("btn")} onClick={lock}>
                <Button lefticon={<FontAwesomeIcon icon={faLock} />}>
                  Liked
                </Button>
              </div>
              <div className={cx("border", !isvideo && "tranf")}></div>
            </div>
            <div className={cx("content")}>
              {isvideo ? (
                <div className={cx("videotab")}>
                  {nickuser.videos.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/Tiktok/videos/${item.id}`}
                        className={cx("video-item")}
                      >
                        <VideoTag
                          className={cx("profilevideo")}
                          src={IPHTTP + item.file_url}
                          mouseOutAutoPause
                          mouseOverAutoPlay
                        >
                          <span className={cx("watched")}>
                            <PlaypathIcon />
                            <span>{item.views_count}</span>
                          </span>
                          <p className={cx("name")}>{item.description}</p>
                        </VideoTag>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className={cx("locktab")}>
                  <Lockicon />
                  <h1>Video đã thích của người này ở trạng thái riêng tư</h1>
                  <p>Các video đã thích bởi {nickuser.nickname} hiện đang ẩn</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {follolist && (
        <FollowList
          onclick={handleshowFollowlist}
          currentuser={nickuser}
          followtype={followtype}
          setfollowtype={setfollowtype}
        />
      )}
      {showEditaccount && <EditProfile onclick={handleshowEditaccount} />}
    </div>
  );
}
export default Profile;
