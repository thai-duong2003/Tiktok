import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import Pretop from "../Pretop";
import CommentsItems from "./CommentsItem";
import styles from "./CommentsItems.module.scss";
const cx = classNames.bind(styles);
function Comments({ data }) {
  const [timecom, settimecom] = useState("");
  var [clickview, setclickview] = useState(false);
  const click = () => {
    setclickview(true);
  };
  return (
    <div className={cx("commentblock")}>
      {/* <CommentsItems />
       */}

      {data.length > 0 &&
        data.map((item, index) => {
          const current_date = new Date();
          const date_created_comment = new Date(item.created_at);
          const mimutedUploaded = Math.floor(
            (current_date - date_created_comment) / 999 / 60
          );
          const hoursUploaded = Math.floor(mimutedUploaded / 60);
          const dayUploaded = Math.floor(hoursUploaded / 24);
          const monthUploaded = Math.floor(dayUploaded / 30);
          const yearsUploaded = Math.floor(monthUploaded / 12);
          let a;
          if (yearsUploaded > 0) {
            a = `${yearsUploaded} years ago`;
          }
          if (yearsUploaded === 0 && monthUploaded > 0) {
            a = `${monthUploaded} month ago`;
          }
          if (yearsUploaded === 0 && monthUploaded === 0 && dayUploaded > 0) {
            a = `${dayUploaded} days ago`;
          }
          if (
            yearsUploaded === 0 &&
            monthUploaded === 0 &&
            dayUploaded === 0 &&
            hoursUploaded > 0
          ) {
            a = `${hoursUploaded} hours ago`;
          }
          if (
            yearsUploaded === 0 &&
            monthUploaded === 0 &&
            dayUploaded === 0 &&
            hoursUploaded === 0
          ) {
            a = `${hoursUploaded} minutes ago`;
          }
          return (
            <div key={index}>
              <CommentsItems data={item} atime={a} />
              {/* {clickview && (
                <div className={cx("repcomment")}>
                  <CommentsItems className={"repitem"} />
                  <CommentsItems className={"repitem"} />
                </div>
              )}
              {!clickview && (
                <button className={cx("viewreply")} onClick={click}>
                  <span>{`View ${5} reply`}</span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              )} */}
            </div>
          );
        })}
    </div>
  );
}
export default Comments;
