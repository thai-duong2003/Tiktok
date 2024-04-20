import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchContex } from "~/hook/context/SearchContex";
import styles from "./SearchResuil.module.scss";
import * as searchservice from "~/Services/searchServices";
import SearchVideopage from "./searchVideopage/searchVideopage";
import AccountItem from "~/conponents/AccountItem";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function SearchResuil({}) {
  const { Searchkeyword } = useContext(SearchContex);
  const [searchResult, setsearchResult] = useState([]);
  const linkref = useRef();
  let type = "less";
  let page = 1;
  useEffect(() => {
    const callApi = async () => {
      const resuilt = await searchservice.Searchuser(Searchkeyword, type, page);
      setsearchResult(resuilt);
    };
    Searchkeyword && callApi();
  }, [page, Searchkeyword]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("acc")}>
            <h5>
              Tài Khoản
              <span
                className={cx("seemore")}
                onClick={() => {
                  linkref.current.click();
                }}
              >
                Xem thêm
              </span>
            </h5>
            <Link
              ref={linkref}
              to={`/Tiktok/Search/users${
                Searchkeyword && "?q=" + Searchkeyword
              }`}
            ></Link>
            {searchResult.map((item, index) => {
              return (
                <div key={index}>
                  <AccountItem data={item} />
                </div>
              );
            })}
          </div>
          <div className={cx("video")}>
            <h5>Video</h5>
            <SearchVideopage />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchResuil;
