import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import config from "~/Config";
import MenuSidebar from "./Menu/Menu";
import { MenuItemSidebar } from "./Menu";
import {
  Followingicon,
  FollowingiconActive,
  GroupActiveicon,
  Groupicon,
  HomeActiveIcon,
  HomeIcon,
  Khamphaicon,
  Khamphaiconactive,
  LiveActiveicon,
  Liveicon,
} from "~/conponents/Icon/Icon";
import SuggesteAcount from "~/conponents/SuggesteAcount";
import { useContext, useEffect, useState } from "react";
import * as userServices from "~/Services/SuggestServices";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import LoginRegister from "~/page/LoginRegister/LoginRegister";
import images from "~/access/image";
const cx = classNames.bind(styles);
function Sidebar() {
  const { detailluserlogin, setsearch_user_click } = useContext(Appcontext);
  const [suggesteUsers, setsuggesteUsers] = useState([]);
  const [page, setpage] = useState(1);
  const [showregister, setshowregister] = useState(false);

  const handleclickshowRegister = (e) => {
    if (detailluserlogin === "") {
      e.preventDefault();
      setshowregister(true);
    } else {
      setshowregister(false);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.Suggest({
        page: page,
      });
      setsuggesteUsers(resuilt);
    };
    fetchApi();
  }, [page]);
  const handleseemore = () => {
    setpage(page + 1);
  };
  const handleselles = () => {
    setpage(page - 1);
  };
  return (
    <div className={cx("wrapper")}>
      <MenuSidebar>
        <MenuItemSidebar
          title="For you"
          to={config.routes.home}
          activeicon={<HomeActiveIcon />}
          icon={<HomeIcon />}
        />
        <MenuItemSidebar
          to={config.routes.following}
          icon={<Followingicon />}
          activeicon={<FollowingiconActive />}
          title="Following"
          // onclick={handleclickshowRegister}
        />

        <MenuItemSidebar
          title={"Friend"}
          to={config.routes.friendPage}
          icon={<Groupicon />}
          onclick={handleclickshowRegister}
          activeicon={<GroupActiveicon />}
        />
        <MenuItemSidebar
          title={"Explore"}
          to={"/Tiktok/Explores"}
          icon={<Khamphaicon />}
          activeicon={<Khamphaiconactive />}
          onclick={() => {
            setsearch_user_click(`/Explores`);
          }}
        />
        <MenuItemSidebar
          to={config.routes.live}
          title="Live"
          icon={<Liveicon />}
          activeicon={<LiveActiveicon />}
        />

        {/* {detailluserlogin && ( */}
        <span
          onClick={() => {
            setsearch_user_click(`/@${detailluserlogin.nickname}`);
          }}
        >
          <MenuItemSidebar
            to={
              detailluserlogin
                ? `/Tiktok/@${detailluserlogin.nickname}`
                : "/Tiktok/profile"
            }
            image
            onclick={handleclickshowRegister}
            title="Profile"
          />
        </span>
        {/* )} */}
      </MenuSidebar>
      <SuggesteAcount
        seeall={handleseemore}
        seeless={handleselles}
        title="Suggested accounts"
        data={suggesteUsers}
      />
      <a
        href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
        target={"_blank"}
      >
        <div className={cx("effect")}>
          <img src={images.effect}></img>
          <p>Create TikTok effects, get a reward</p>
        </div>
      </a>
      {detailluserlogin !== ""
        ? ""
        : showregister && (
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
export default Sidebar;
