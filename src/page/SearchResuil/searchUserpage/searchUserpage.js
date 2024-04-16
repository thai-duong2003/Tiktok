import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import AccountItem from "~/conponents/AccountItem";
import styles from "./searchUserpage.module.scss";
import * as searchservice from "~/Services/searchServices";
import { SearchContex } from "~/hook/context/SearchContex";
import SearchNoResuilt from "../SearchNoResuilt/SearchNoResuilt";
import Loading from "~/conponents/loading/Loading";
const cx = classNames.bind(styles);

function SearchUserpage({}) {
  const [searchResult, setsearchResult] = useState([]);
  const { Searchkeyword } = useContext(SearchContex);
  const [loading, setloading] = useState(false);

  let type = "more";
  let page = 1;
  useEffect(() => {
    const callApi = async () => {
      setloading(true);
      const resuilt = await searchservice.Searchuser(Searchkeyword, type, page);
      setsearchResult(resuilt);
      setloading(false);
    };
    Searchkeyword && callApi();
  }, [page]);
  return (
    <div className={cx("wrapper")}>
      {searchResult.length > 0 ? (
        <div className={cx("container")} style={{ marginTop: "15px" }}>
          <div className={cx("row")}>
            {searchResult.map((item, index) => {
              return (
                <div key={index} className={cx("col-sm-12")}>
                  <AccountItem
                    data={item}
                    showfl
                    className={cx("searchUserPagge")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : loading ? (
        <div className={cx("loadmore", "loading")}>
          <Loading />
        </div>
      ) : (
        <SearchNoResuilt />
      )}
    </div>
  );
}
export default SearchUserpage;
