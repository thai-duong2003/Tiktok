import { TiviIcon } from "~/conponents/Icon/Icon";
import classNames from "classnames/bind";
import styles from "./SearchNoResuilt.module.scss";

const cx = classNames.bind(styles);

function SearchNoResuilt({}) {
  return (
    <div className={cx("container")}>
      <div className={cx("row")}>
        <div className={cx("col-sm-12 ", "content")}>
          <div className={cx("icon")}>
            <TiviIcon />
          </div>
          <h2>Không tìm thấy kết quả</h2>
          <p>Kiểm tra chính tả hoặc thử một tìm kiếm khác.</p>
        </div>
      </div>
    </div>
  );
}
export default SearchNoResuilt;
