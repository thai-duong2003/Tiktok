import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Acountitem from "./AcountItem";
import styles from "./SuggesteAcount.module.scss";

const cx = classNames.bind(styles);
function SuggesteAcount({ data, title, seeall, seeless }) {
  const [clickseeall, setclickseeall] = useState(false);
  const { setsearch_user_click } = useContext(Appcontext);

  const handlesee = () => {
    if (clickseeall) {
      setclickseeall(false);
      seeless();
    } else {
      setclickseeall(true);
      seeall();
    }
  };
  return (
    <div className={cx("wrapper ")}>
      <p className={cx("lable")}>{title}</p>
      {data &&
        data.map((item, index) => {
          const clicksuggest = () => {
            setsearch_user_click(`/@${item.nickname}`);
          };
          return (
            <div onClick={clicksuggest} key={index}>
              <Acountitem data={item} />
            </div>
          );
        })}
      {clickseeall ? (
        <p className={cx("seeall")} onClick={handlesee}>
          See Less
        </p>
      ) : (
        <p className={cx("seeall")} onClick={handlesee}>
          See All
        </p>
      )}
    </div>
  );
}
export default SuggesteAcount;
