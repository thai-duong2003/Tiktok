import classNames from "classnames/bind";
import { config } from "~/App";
import {
  faAngleDown,
  faAngleUp,
  faEllipsis,
  faPlay,
  faVolumeXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TippyOptionvideo } from "~/conponents/Video";
import Search from "~/layouts/Conponent/Search/Search";
import styles from "./VideodetailControl.module.scss";
import { useContext, useEffect, useState } from "react";
import Volume from "~/conponents/Volume";
import { Link } from "react-router-dom";
import { profilepage } from "~/page/Profile/Profile";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
const cx = classNames.bind(styles);

function VideodetailControl({ videoelement, data, currentVideo, nexpage }) {
  const { btnlikeactive } = useContext(Appcontext);
  const [indexNextVideoId, setindexNextVideoId] = useState("");
  const [indexPreVideoID, setindexPreVideoID] = useState("");

  let indexNextID;
  let indexPreId;
  // tìm xem idvideo hiện tại đang ở index bao nhiêu trong mang
  data &&
    data.find((item, index) => {
      if (Number(item.id) === currentVideo) {
        indexNextID = index + 1;
        indexPreId = index - 1;
      }
    });

  // gán index vào để state
  useEffect(() => {
    setindexNextVideoId(indexNextID && indexNextID);
    setindexPreVideoID(indexPreId && indexPreId);
  }, [indexNextID]);

  // kiểm tra xem index có vượt quá sl item trong mảng ko
  if (profilepage.page !== "/Tiktok/") {
    if (indexNextID === data.length) {
      indexNextID = 0;
    }
  }

  return (
    <div className={cx("wrappercontrol")}>
      <Link to={`${profilepage.page}`} className={cx("close", "btn")}>
        <FontAwesomeIcon icon={faXmark} />
      </Link>
      <Search className={"videocontrol"} />
      <div className={cx("control")}>
        <TippyOptionvideo>
          <span className={cx("menu", "btn")}>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>
        </TippyOptionvideo>
        <div className={cx("arrow")}>
          <span
            className={cx("arrow_up", "btn")}
            onClick={() => {
              btnlikeactive();
            }}
          >
            {indexPreId + 1 === 0 ? (
              <span className={cx("hideactive")}>
                <FontAwesomeIcon icon={faAngleUp} />
              </span>
            ) : (
              <Link
                to={`/Tiktok/videos/${
                  data &&
                  indexPreVideoID !== undefined &&
                  data[indexPreId] !== undefined
                    ? data[indexPreVideoID] && data[indexPreVideoID].id
                    : ""
                }`}
                className={cx("btn")}
              >
                <FontAwesomeIcon icon={faAngleUp} />
              </Link>
            )}
          </span>
          <span
            className={cx("arrow_down", "btn")}
            onClick={() => {
              if (indexNextID === data.length - 1) {
                nexpage();
              }
              btnlikeactive();
            }}
          >
            <Link
              to={`/Tiktok/videos/${
                data &&
                indexNextVideoId !== undefined &&
                data[indexNextID] !== undefined
                  ? data[indexNextVideoId] && data[indexNextVideoId].id
                  : ""
              }`}
              className={cx("btn")}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </Link>
          </span>
        </div>
        <div className={cx("volume", "btn")}>
          <Volume classnames={"volumedetail"} element={videoelement} />
        </div>
      </div>
    </div>
  );
}

export default VideodetailControl;
