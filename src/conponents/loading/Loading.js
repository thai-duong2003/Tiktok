import classNames from "classnames/bind";
import styles from "./loading.module.scss";
const cx = classNames.bind(styles);
function Loading() {
  return (
    <div className={cx("load")}>
      <div className={cx("black")}></div>
      <div className={cx("green")}></div>
      <div className={cx("pink")}></div>
    </div>
  );
}
export default Loading;
