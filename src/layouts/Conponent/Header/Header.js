import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import images from "~/access/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import routes from "~/Config/routes";
import Search from "../Search/Search";
import Button from "~/conponents/Button";
import {
  faCircleQuestion,
  faCoins,
  faEllipsisVertical,
  faKeyboard,
  faPlus,
  faUser,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "~/conponents/Menu";
import { InboxIcon, MessagesIcon, UploadIcon } from "~/conponents/Icon/Icon";
import { faAppStore } from "@fortawesome/free-brands-svg-icons";
import Image from "~/conponents/Image";
import LoginRegister from "~/page/LoginRegister/LoginRegister";
import { useContext, useState } from "react";

import { IPHTTP } from "~/utils/httprequest";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
export let AcountLogin;
const cx = classNames.bind(styles);
function Header() {
  //handle logic
  const [clickloginbtn, setclickloginbtn] = useState(false);

  const handlelogin = () => {
    if (clickloginbtn) {
      setclickloginbtn(false);
    } else {
      setclickloginbtn(true);
    }
  };
  const { detailluserlogin, data_login_success } = useContext(Appcontext);

  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faAppStore} />,
      title: "English",
      submenu: {
        title: "Language",
        data: [
          { code: "EN", title: "English" },
          { code: "VN", title: "Tieng Viet" },
        ],
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: "Feedback and help",
      to: "/Tiktok/feedback",
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: "Keyboard shortcuts",
    },
  ];

  const usermenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "view profile",
      to: `/Tiktok/@${detailluserlogin && detailluserlogin.nickname}`,
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/Tiktok/feedback",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Setting",
      to: "/Tiktok/settings",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "log out",
      // to: "/Tiktok/logout",
      ref: "atc",
      separate: true,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={routes.home} className={cx("logo_link")}>
            <img src={images.logo} alt="tiktok" />
          </Link>
        </div>

        <div>
          <Search />
        </div>
        <div className={cx("action")}>
          {detailluserlogin ? (
            <>
              {" "}
              <Tippy content="Upload video" placement="bottom" delay={[0, 200]}>
                <Link to={"/Tiktok/upload"}>
                  <button className={cx("action-btn")}>
                    <UploadIcon />
                  </button>
                </Link>
              </Tippy>
              <Tippy content="Messages" placement="bottom" delay={[0, 200]}>
                <button className={cx("action-btn")}>
                  <MessagesIcon />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement="bottom" delay={[0, 200]}>
                <button className={cx("action-btn")}>
                  <InboxIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              {" "}
              <Button
                onClick={handlelogin}
                text
                lefticon={<FontAwesomeIcon icon={faPlus} />}
              >
                Upload
              </Button>
              <Button primary onClick={handlelogin}>
                Log in
              </Button>
            </>
          )}
          <Menu items={detailluserlogin ? usermenu : MENU_ITEMS}>
            {detailluserlogin ? (
              <Image
                className={cx("user-avata")}
                src={
                  detailluserlogin.avatar === ""
                    ? images.noImg
                    : IPHTTP + detailluserlogin.avatar
                }
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
        {data_login_success
          ? ""
          : clickloginbtn && (
              <div className={cx("loginform")} onClick={handlelogin}>
                <LoginRegister />
              </div>
            )}
      </div>
    </div>
  );
}
export default Header;
