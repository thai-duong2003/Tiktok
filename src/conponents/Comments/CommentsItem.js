import classNames from "classnames/bind";
import styles from "./CommentsItems.module.scss";
import Image from "../Image";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { HeartIconActive, HeartPathIcon } from "../Icon/Icon";
import Baocaoblock from "../baocaoblock";
import { createContext, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "../SuggesteAcount/AcountPrevew/AcountPreview";
import { Wrapper } from "../popper";
import { useState } from "react";
import { IPHTTP } from "~/utils/httprequest";
const cx = classNames.bind(styles);

export const context = createContext();

function CommentsItems({ data, className, atime }) {
  const [clickheart, setclickheart] = useState(false);

  const timeref = useRef();
  const timetag = timeref.current;

  const like = () => {
    setclickheart(true);
  };
  const unlike = () => {
    setclickheart(false);
  };
  return (
    <div className={cx("wrapper", { [className]: className })}>
      <div className={cx("user")}>
        <Link to={`/Tiktok/@${data.user.nickname}`}>
          {" "}
          <Image
            className={cx("avatar")}
            src={IPHTTP + data.user.avatar}
          ></Image>
        </Link>

        <div className={cx("info")}>
          <div>
            <Tippy
              interactive
              placement="bottom"
              render={(attrs) => {
                return (
                  <div tabIndex={"-1"} {...attrs}>
                    <Wrapper>
                      <AccountPreview bodyshow data={data.user} />
                    </Wrapper>
                  </div>
                );
              }}
            >
              <Link to={`/Tiktok/@${data.user.nickname}`}>
                <div style={{ display: "inline-block" }}>
                  <p className={cx("name")}>{data.user.name}</p>
                  {data.user.tick === "true" && (
                    <FontAwesomeIcon
                      className={cx("check")}
                      icon={faCheckCircle}
                    />
                  )}
                </div>
              </Link>
            </Tippy>
          </div>
          <div className={cx("contents")}>
            <div className={cx("content")}>
              <p>{data.content}</p>
              <p className={cx("daterep")}>
                <span ref={timeref}>{atime}</span>
                <span>Repply</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>
          <Baocaoblock x={15} y={-10} />
        </span>
        <div className={cx("heart")}>
          {clickheart ? (
            <span onClick={unlike}>
              <HeartIconActive />
            </span>
          ) : (
            <span onClick={like}>
              <HeartPathIcon />
            </span>
          )}
        </div>
        <p>{data.like_count}</p>
      </div>
    </div>
  );
}

export default CommentsItems;
