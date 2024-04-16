import classNames from "classnames/bind";
import styles from "./live.module.scss";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/conponents/Button";
const cx = classNames.bind(styles);

function Live() {
  document.title = "TikTok LIVE | TikTok";

  const nabar = [
    {
      title: "For you",
      link: "/live",
    },
    {
      title: "Following",
      link: "/live/Following",
    },
    {
      title: "Gaming",
      link: "/live/Gaming",
    },
    {
      title: "LifeStyle",
      link: "/live/LifeStyle",
    },
    {
      title: "Arena Of Valor",
      link: "/live/Arena_Of_Valor",
    },
    {
      title: "Dota 2",
      link: "/live/Dota_2",
    },
    {
      title: "League of Legends",
      link: "/live/League_of_Legends",
    },
    {
      title: "WolfTeam",
      link: "/live/WolfTeam",
    },
    {
      title: "Call Of Duty",
      link: "/live/Call_Of_Duty",
    },
    {
      title: "WolfTeam",
      link: "/live/WolfTeam",
    },
  ];
  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("navbarblock")}>
        <div className={cx("nav", "nav_list")}>
          {nabar.map((item, index) => {
            return (
              <Link
                to={item.link}
                className={cx("nav-item", "item", "disabled")}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className={cx("nolive")}>
        <h1>No LIVE videos for you yet</h1>
        <h3>Go back to explore more videos</h3>
        <button>Go Back</button>
      </div>
    </div>
  ); //GenerateVideoThumbnails
}
export default Live;
