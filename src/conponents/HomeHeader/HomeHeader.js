import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Image from "../Image";
import styles from "./HomeHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEllipsis,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "../SuggesteAcount/AcountPrevew/AcountPreview";
import { Wrapper } from "../popper";
import { IPHTTP } from "~/utils/httprequest";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Deleteblock from "../deleteblock";
import images from "~/access/image";
import FollowBtn from "~/page/Profile/Follow/FollowBtn";
import { CheckArray } from "~/page/Home/Checkfollow";
import LoginRegister from "~/page/LoginRegister/LoginRegister";

const cx = classNames.bind(styles);

function HomeHeaderItem({ data, className, id_current_user }) {
  const { setsearch_user_click, followinguserlist, detailluserlogin } =
    useContext(Appcontext);

  const [ismore, setismore] = useState(false);
  const [deletebtn, setdelete] = useState(false);
  const [showregister, setshowregister] = useState(false);

  const defaultdata = {
    user: {
      nickname: "",
      avatar: images.noImg,
      tick: false,
      name: "",
      id: "",
    },
  };
  const datauser = data ? data.user : defaultdata;

  const check_follow = CheckArray(
    followinguserlist && followinguserlist,
    datauser && datauser.id
  );

  const Accprevi = ({ children, name = false }) => (
    <div>
      <Tippy
        interactive
        offset={name && [-65, 30]}
        placement="bottom-start"
        delay={[500, 700]}
        hideOnClick={false}
        render={(attrs) => (
          <div tabIndex="-1" {...attrs}>
            <Wrapper>
              <AccountPreview data={datauser} bodyshow />
            </Wrapper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
  const handleclick_user = () => {
    setsearch_user_click(`/@${datauser.nickname}`);
  };
  const handle_click_btn_delete = () => {
    if (deletebtn) {
      setdelete(false);
    } else {
      setdelete(true);
    }
  };

  return (
    <div className={cx("wrapper", { [className]: className })}>
      <div className={cx("user")}>
        <Accprevi>
          <Link to={`/Tiktok/@${datauser.nickname}`} onClick={handleclick_user}>
            <Image
              className={cx("avatar")}
              src={IPHTTP + datauser.avatar}
            ></Image>
          </Link>
        </Accprevi>

        <div className={cx("info")}>
          <Accprevi name>
            <Link
              to={`/Tiktok/@${datauser.nickname}`}
              onClick={handleclick_user}
            >
              <p className={cx("name")}>
                <strong>{datauser.nickname}</strong>
                {datauser.tick === "true" && (
                  <FontAwesomeIcon
                    className={cx("check")}
                    icon={faCheckCircle}
                  />
                )}
                <span className={cx("fullname")}>{datauser.name}</span>
              </p>
            </Link>
          </Accprevi>
          <div className={cx("contents")}>
            <p className={cx("content", ismore && "block")}>
              {data && data.description}
            </p>
            {data &&
              data.description.length >= 95 &&
              (ismore ? (
                <span className={cx("more")} onClick={() => setismore(false)}>
                  less
                </span>
              ) : (
                <span className={cx("more")} onClick={() => setismore(true)}>
                  more
                </span>
              ))}
          </div>
          <p className={cx("music")}>
            <FontAwesomeIcon icon={faMusic} />
            <span>{data && data.music}</span>
          </p>
        </div>
      </div>
      <div>
        {id_current_user ? (
          datauser.id === id_current_user ? (
            <Tippy
              interactive
              placement="bottom-end"
              offset={[0, -3]}
              delay={[200, 300]}
              // visible
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <Wrapper>
                    <span className={cx("arround")}></span>
                    <p className={cx("op_menu")}>Cài đặt quyền riêng tư</p>
                    <p
                      className={cx("op_menu")}
                      onClick={handle_click_btn_delete}
                    >
                      Xóa
                    </p>
                  </Wrapper>
                </div>
              )}
            >
              <div className={cx("sub_menu")}>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </Tippy>
          ) : (
            <FollowBtn
              followingUserId={datauser.id}
              outline
              className={"buttom"}
            >
              {check_follow ? "Following" : "Follow"}
            </FollowBtn>
          )
        ) : detailluserlogin === "" ? (
          <span
            className={cx(id_current_user ? "hidebuttom" : "hideglobal")}
            onClick={() => {
              detailluserlogin === "" && setshowregister(true);
            }}
          >
            <FollowBtn followingUserId={datauser.id} outline>
              Follow
            </FollowBtn>
          </span>
        ) : (
          ""
        )}
        {check_follow || detailluserlogin.id === datauser.id ? (
          ""
        ) : (
          <span
            className={cx("buttom2")}
            onClick={() => {
              detailluserlogin === "" && setshowregister(true);
            }}
          >
            <FollowBtn followingUserId={datauser.id} outline>
              Follow
            </FollowBtn>
          </span>
        )}
      </div>
      {deletebtn && (
        <Deleteblock
          onclick={handle_click_btn_delete}
          id_video={data.id}
          id_user={id_current_user}
        />
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
    </div>
  );
}
export default HomeHeaderItem;
