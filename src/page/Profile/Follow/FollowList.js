import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Fragment, useContext, useEffect, useState } from "react";
import AccountItem from "~/conponents/AccountItem";
import Loading from "~/conponents/loading/Loading";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { CheckArray } from "~/page/Home/Checkfollow";

import {
  FollowerList,
  FollowingList,
  friendsList,
} from "~/Services/Flollowservice";
import FollowBtn from "./FollowBtn";
import styles from "./FollowList.module.scss";

const cx = classNames.bind(styles);

function FollowList({ currentuser, onclick, followtype, setfollowtype }) {
  const { detailluserlogin } = useContext(Appcontext);

  const [data, setdata] = useState([]);
  const [friendlist, setfriendlist] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const callapi = async () => {
      setloading(true);
      const resuilt = await FollowingList(currentuser.id);
      setdata(resuilt);
      setloading(false);
    };
    currentuser.id && followtype === 1 && callapi();
  }, [currentuser, followtype]);

  useEffect(() => {
    const callapi = async () => {
      setloading(true);
      const resuilt = await FollowerList(currentuser.id);
      setdata(resuilt);
      setloading(false);
    };
    currentuser.id && followtype === 2 && callapi();
  }, [currentuser, followtype]);

  useEffect(() => {
    const callapi = async () => {
      setloading(true);
      const resuilt = await friendsList(currentuser.id);
      setfriendlist(resuilt);
      setloading(false);
    };
    currentuser.id && callapi();
  }, [currentuser]);

  let datalist;
  if (followtype === 3) {
    datalist = friendlist;
  } else {
    datalist = data;
  }
  return (
    <div className={cx("wrapper")} onClick={onclick}>
      <div
        className={cx("container", "content")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={cx("title")}>
          <h1>{currentuser.nickname}</h1>
          <span className={cx("close")}>
            <span onClick={onclick}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </span>
        </div>
        <div className={cx("nav", "naba")}>
          <div
            className={cx(
              "nav-item",
              "naba_item",
              followtype === 1 && "active"
            )}
            onClick={() => {
              setfollowtype(1);
            }}
          >
            <p>Following</p>
            <span className={cx("count")}>{currentuser.following_counts}</span>
          </div>
          <div
            className={cx(
              "nav-item",
              "naba_item",
              followtype === 2 && "active"
            )}
            onClick={() => {
              setfollowtype(2);
            }}
          >
            <p>Follower</p>
            <span className={cx("count")}>{currentuser.follower_counts}</span>
          </div>
          {currentuser.id === detailluserlogin.id && (
            <div
              className={cx(
                "nav-item",
                "naba_item",
                followtype === 3 && "active"
              )}
              onClick={() => {
                setfollowtype(3);
              }}
            >
              <p>Friends</p>
              <span className={cx("count")}>{currentuser.friend_counts}</span>
            </div>
          )}
        </div>

        <div className={cx("account")}>
          {loading ? (
            <div className={cx("loadmore")}>
              <Loading />
            </div>
          ) : (
            <div className={cx("account_list")}>
              {datalist.map((item, index) => {
                const check_follow = CheckArray(
                  friendlist && friendlist,
                  item && item.id
                );
                const followtypeText = () => {
                  switch (followtype) {
                    case 2: {
                      return check_follow ? "Friend" : "Follower back";
                      break;
                    }
                    case 3: {
                      return "Friend";
                      break;
                    }

                    default:
                      return check_follow ? "Friend" : "Following";
                  }
                };
                return (
                  <div className={cx("account_item")} key={index}>
                    <div onClick={onclick}>
                      <AccountItem data={item} />
                    </div>
                    <div className={cx("button")}>
                      <FollowBtn
                        outline
                        followingUserId={item.id}
                        className={"small"}
                      >
                        {followtypeText()}{" "}
                      </FollowBtn>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowList;
