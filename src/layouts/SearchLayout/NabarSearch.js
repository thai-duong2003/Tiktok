import classNames from "classnames/bind";
import styles from "./SearchLayout.module.scss";
import { useContext } from "react";
import { MenuItemSidebar } from "~/layouts/Conponent/Sidebar/Menu";
import { SearchContex } from "~/hook/context/SearchContex";
const cx = classNames.bind(styles);

function NabarSearch({}) {
  const { Searchkeyword } = useContext(SearchContex);
  document.title = `Find '${Searchkeyword}' on TikTok | TikTok Search`;

  return (
    <div className={cx("nav-pills", "nav")}>
      <div className={cx("nav-item")}>
        <MenuItemSidebar
          to={`/Searchs${Searchkeyword && "?q=" + Searchkeyword}`}
          title={"Top"}
          className={"searchResuilpage"}
        />
      </div>
      <div className={cx("nav-item")}>
        <MenuItemSidebar
          to={`/Search/users${Searchkeyword && "?q=" + Searchkeyword}`}
          title={" Tài khoản"}
          className={"searchResuilpage"}
        />
      </div>
      <div className={cx("nav-item")}>
        {" "}
        <MenuItemSidebar
          to={`/Search/video${Searchkeyword && "?q=" + Searchkeyword}`}
          title={" Video"}
          className={"searchResuilpage"}
        />
      </div>
    </div>
  );
}
export default NabarSearch;
