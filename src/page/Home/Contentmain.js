import HomeHeader from "~/conponents/HomeHeader";
import Video from "~/conponents/Video";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { memo, useContext, useRef, useState } from "react";
import Loading from "~/conponents/loading/Loading";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Videobtnactive from "~/conponents/Videobtnactive";
import { CheckVideoLiked } from "./checkVideoLiked";

const cx = classNames.bind(styles);

function Contentmain({ video, page, setpage }) {
  const [loadmore, setloadmore] = useState(false);
  const contairef = useRef();

  const { loading_detail, listLikeduser, likeBtn } = useContext(Appcontext);
  window.onscroll = () => {
    if (contairef.current) {
      const heightconten = contairef.current.offsetHeight; //chieu cao cua trang
      const percentScrolly = Math.floor((window.scrollY / heightconten) * 100); // lay %

      if (percentScrolly === 90) {
        setpage(page + 1);
        setloadmore(true);
      } else {
        setloadmore(false);
      }
    }
  };

  return (
    <div ref={contairef}>
      {video &&
        video.map((item, index) => {
          return (
            <div key={index} className={cx("home-conten")}>
              <HomeHeader data={item} />
              <div className={cx("video_lock")}>
                <Video data={item} />
                <Videobtnactive
                  data={item}
                  video_id_liked={
                    CheckVideoLiked(listLikeduser, item.id) &&
                    CheckVideoLiked(listLikeduser, item.id)
                  }
                />
              </div>
            </div>
          );
        })}
      {loading_detail && (
        <div className={cx("load")}>
          <Loading />
        </div>
      )}
      {loadmore && (
        <div className={cx("loadmore")}>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default memo(Contentmain);
