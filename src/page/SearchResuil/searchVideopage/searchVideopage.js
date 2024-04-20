import classNames from "classnames/bind";
import styles from "./searchVideopage.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchContex } from "~/hook/context/SearchContex";
import * as searchservice from "~/Services/searchServices";
import VideoTag from "~/conponents/VideoTag";
import { IPHTTP } from "~/utils/httprequest";
import { Link } from "react-router-dom";
import AccountItem from "~/conponents/AccountItem";
import Loading from "~/conponents/loading/Loading";
import SearchNoResuilt from "../SearchNoResuilt/SearchNoResuilt";
const cx = classNames.bind(styles);
function SearchVideopage({}) {
  const { Searchkeyword } = useContext(SearchContex);

  const [page, setpage] = useState(1);
  const [searchResuiltlist, setsearchResuiltlist] = useState([]);
  const [loadmore, setloadmore] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      try {
        setloadmore(true);
        setloading(true);
        const resuilt = await searchservice.SearchVideo(Searchkeyword, page);
        setsearchResuiltlist(resuilt);
        setloadmore(false);
        setloading(false);
      } catch (err) {}
    };
    Searchkeyword && callApi();
  }, [page, Searchkeyword]);
  window.onscroll = () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const percentScrolly = Math.floor(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    if (percentScrolly === 90) {
      setpage(page + 1);
      setloadmore(true);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {searchResuiltlist.length > 0 ? (
        <div className={cx("container")}>
          <div className={cx("row")}>
            {searchResuiltlist &&
              searchResuiltlist.map((item, index) => {
                return (
                  <div key={index} className={cx(" col-sm-4", "item_video")}>
                    <Link
                      className={cx("item")}
                      to={`/Tiktok/videos/${item.id}`}
                    >
                      <VideoTag
                        src={IPHTTP + item.file_url}
                        className="searchPage"
                      ></VideoTag>

                      <p className={cx("description")}>{item.description}</p>
                    </Link>
                    <AccountItem data={item.user} className={"searchpage"} />
                  </div>
                );
              })}
            {loadmore && (
              <div className={cx("loadmore")}>
                <Loading />
              </div>
            )}
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
export default SearchVideopage;
