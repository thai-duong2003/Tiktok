import classNames from "classnames/bind";
import styles from "./SearchLayout.module.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // nap bootstrap
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import SearchContexApi from "~/hook/context/SearchContex";
import NabarSearch from "./NabarSearch";

const cx = classNames.bind(styles);
function SearchLayout({ children }) {
  return (
    <div className={cx("á")}>
      <SearchContexApi>
        <DefaultLayout>
          <div className={cx("wrapper")}>
            <div className={cx("container")}>
              <NabarSearch />
              {children}
            </div>
          </div>
        </DefaultLayout>
      </SearchContexApi>
    </div>
  );
}
export default SearchLayout;
