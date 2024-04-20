import PropTypes from "prop-types";
import Shareblock from "./Shareblock";
import classNames from "classnames/bind";
import styles from "./Videobtnactive.module.scss";
import { useContext, useEffect, useRef, useState } from "react";

import Tippy from "@tippyjs/react/headless";
import Button from "../Button";
import { Wrapper } from "../popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCommentDots,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { HeartIcon, HeartIconActive, HeartPathIcon } from "../Icon/Icon";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { LikeAndUnlike } from "~/Services/likeservices/likeAndUnlikeService";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Videobtnactive({
  data,
  className,
  deletelastitem = false,
  video_id_liked,
}) {
  const [iconActived, seticonactive] = useState(false);

  const [likebtn, setlikebtn] = useState("");
  const { detailluserlogin, btnlikeactive } = useContext(Appcontext);
  const icon = () => {
    if (video_id_liked) {
      return <HeartIconActive />;
    }
    if (iconActived) {
      return <HeartIconActive />;
    } else {
      return <HeartIcon />;
    }
  };
  const btnactive = [
    {
      icon: icon(),
      iconActive: <HeartIconActive />,
      title: data.like_count,
    },
    {
      icon: <FontAwesomeIcon icon={faCommentDots} />,
      title: data.comment_count,
      name: "comment",
    },
    {
      icon: <FontAwesomeIcon icon={faBookmark} />,
      title: data.favourite_count,
    },
    {
      icon: <FontAwesomeIcon icon={faShare} />,
      title: data.share_count,
      children: true,
    },
  ];
  deletelastitem && btnactive.pop();

  // call api like and unlike
  useEffect(() => {
    const calll = async () => {
      try {
        await LikeAndUnlike(detailluserlogin.id, data.id);

        btnlikeactive();
      } catch (err) {}
    };
    if (likebtn !== "" && detailluserlogin) {
      calll();
    }
  }, [likebtn]);
  const linkelement = useRef();

  return (
    <div className={cx("wrapper", { [className]: className })}>
      {btnactive.map((item, index) => {
        const isparent = !item.children;

        if (isparent) {
          var like_btn;
          if (item.iconActive) {
            like_btn = () => {
              if (likebtn) {
                setlikebtn(false);
              } else {
                setlikebtn(true);
              }
            };
          }
          if (item.name === "comment") {
            like_btn = () => {
              linkelement.current.click();
            };
          }
          return (
            <div key={index}>
              <Button onClick={like_btn} cricle key={index}>
                {item.icon}
              </Button>{" "}
              <p>{item.title}</p>
              <Link to={`/Tiktok/videos/${data.id}`} ref={linkelement}></Link>
            </div>
          );
        } else {
          return (
            <Tippy
              key={index}
              interactive
              hideOnClick={false}
              offset={[-30, 20]}
              delay={[0, 500]}
              placement="top-start"
              render={(attrs) => (
                <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
                  <Wrapper className={cx("menu-popper")}>
                    <Shareblock />
                  </Wrapper>
                </div>
              )}
            >
              <div key={index}>
                <button className={cx("cricle")}>{item.icon}</button>
                <p>{item.title}</p>
              </div>
            </Tippy>
          );
        }
      })}
    </div>
  );
}
export default Videobtnactive;
