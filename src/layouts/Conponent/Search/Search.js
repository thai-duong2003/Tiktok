import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Search.module.scss";
import { Wrapper as PopperWrapper } from "~/conponents/popper";
import AccountItem from "~/conponents/AccountItem";
import { useRef, useState, useEffect, useContext } from "react";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import useDebounce from "~/hook/useDebounce";
import * as searchServices from "~/Services/searchServices";
import { Link } from "react-router-dom";
import { SearchContex } from "~/hook/context/SearchContex";
const cx = classNames.bind(styles);

function Search({ className }) {
  const { paramsearch, Searchkeyword, setSearchkeyword } =
    useContext(SearchContex);

  const inputref = useRef();
  const [searchvalue, setsearchvalue] = useState(
    paramsearch ? paramsearch : ""
  );
  const [loading, setloading] = useState(false);
  const [searchResult, setsearchResult] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const debounce = useDebounce(searchvalue, 100);
  const linktosearchpage = useRef();

  let type = "less";
  let page = 1;
  useEffect(() => {
    if (!debounce.trim()) {
      setsearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setloading(true);
      const result = await searchServices.Searchuser(debounce, type, page);
      setsearchResult(result);
      setloading(false);
    };

    fetchApi();
  }, [debounce]);
  const handleChange = (e) => {
    const valuesearch = e.target.value;
    if (!valuesearch.startsWith(" ")) {
      setsearchvalue(valuesearch);
    }
  };
  const handleclear = () => {
    setsearchvalue("");
    inputref.current.focus();
  };
  const handleOnkeyUp = (e) => {
    if (e.which === 13) {
      setSearchkeyword(debounce);
      linktosearchpage.current.click();
      setshowresult(false);
      inputref.current.blur();
    }
  };
  return (
    <Tippy
      interactive
      visible={showresult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx("search-resuilt")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx("search-resuilt_title")}>Account</h4>
            {searchResult.map((item, index) => {
              const handleclickAcoount = (e) => {
                setsearchvalue("");
                setshowresult(false);
              };
              return (
                <div
                  className={cx("thai")}
                  onClick={handleclickAcoount}
                  key={index}
                >
                  <AccountItem data={item} />
                </div>
              );
            })}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={() => setshowresult(false)}
    >
      <div className={cx("search", { [className]: className })}>
        <input
          ref={inputref}
          type="text"
          placeholder="Search account and video"
          spellCheck={false}
          required
          value={searchvalue}
          onChange={handleChange}
          onFocus={() => setshowresult(true)}
          onKeyUp={handleOnkeyUp}
        />
        {!!searchvalue && !loading && (
          <button className={cx("clear")} onClick={handleclear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}
        <button
          className={cx("search-btn")}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setSearchkeyword(debounce);
            setshowresult(false);
            linktosearchpage.current.click();
            inputref.current.blur();
          }}
        >
          <Link ref={linktosearchpage} to={`/Searchs?q=${searchvalue}`}></Link>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </Tippy>
  );
}
export default Search;
