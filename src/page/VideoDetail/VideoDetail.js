import classNames from "classnames/bind";
import HomeHeader from "~/conponents/HomeHeader";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Comments, { WriteComment } from "~/conponents/Comments";
import Pretop from "~/conponents/Pretop";
import Videobtnactive from "~/conponents/Videobtnactive";
import Shareblock from "~/conponents/Videobtnactive/Shareblock";
import VideoTag from "~/conponents/VideoTag";
import styles from "./VideoDetail.module.scss";

import { getanvideo } from "~/Services/VideoService/getanvideo";
import { IPHTTP } from "~/utils/httprequest";
import { Getcomment } from "~/Services/commentService/Commentlist";
import { Link } from "react-router-dom";
import LoginRegister from "../LoginRegister/LoginRegister";
import VideodetailControl from "./VideodetailControl";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { CheckVideoLiked } from "../Home/checkVideoLiked";
import { profilepage } from "../Profile/Profile";
import * as userServices from "~/Services/VideoService/Videoservice";
import SearchContexApi from "~/hook/context/SearchContex";

const cx = classNames.bind(styles);

function VideoDetail() {
  const [commentLayout, setcommentLayout] = useState(true);
  const [log, setlog] = useState(false);
  // const [video , setvideo] = useState('')
  const link =
    "https://images2.thanhnien.vn/Uploaded/nhuvnq/2021_12_09/ta03-7305.jpg";

  const linkref = useRef();
  const videoblockref = useRef();

  const [datavideo, setdatavideo] = useState("");
  const [videocreattor, setvideocreattor] = useState("");
  const [commentlist, setcommentlist] = useState("");
  const [callcomm, setcallcomm] = useState(datavideo.id);
  const [history, sethistory] = useState("");
  const [change, setchange] = useState(false);
  const [videolis, setvideolis] = useState("");
  const [page, setpage] = useState(1);

  const { detailluserlogin, listLikeduser, likeBtn } = useContext(Appcontext);

  if (videoblockref.current) {
    var videoref = videoblockref.current.querySelector("video");
  }

  var pathname = document.location.pathname.slice(1);

  // call get an video api

  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await getanvideo(pathname);
      if (resuilt) {
        setdatavideo(resuilt[0][0]);
        setvideocreattor(resuilt[1]);
        sethistory((pre) => [...pre, datavideo]);
        if (change) {
          setchange(false);
        } else {
          setchange(true);
        }
      } else {
        return;
      }
    };

    fetchApi();
  }, [pathname, likeBtn]);

  //call api get video list
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.Video({ page: page });
      setvideolis(resuilt);
    };
    profilepage.page === "/" && fetchApi();
  }, [page]);

  //call api get video following list
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.FollowingVideoList({
        userId: detailluserlogin.id,
        page: page,
      });
      setvideolis(resuilt);
    };
    profilepage.page === "/following" && detailluserlogin && fetchApi();
  }, [page, detailluserlogin]);

  //call api get video friend list
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.FriendVideoList({
        userId: detailluserlogin.id,
        page: page,
      });
      setvideolis(resuilt);
    };
    profilepage.page === "/friends" && detailluserlogin && fetchApi();
  }, [page, detailluserlogin]);

  // call Comment api
  useEffect(() => {
    if (datavideo.id) {
      const comnentapi = async () => {
        const resuilt = await Getcomment(datavideo.id);
        setcommentlist(resuilt);
      };
      comnentapi();
    }
  }, [callcomm, datavideo.id]);
  const handlog = () => {
    if (detailluserlogin === "") {
      setlog(true);
    }
    if (log) {
      setlog(false);
    }
  };
  const closelog = () => {
    setlog(false);
  };
  const handlecoppy = (e) => {
    linkref.current.select();
    document.execCommand("copy");
    e.target.innerText = "Copied !";
  };
  const handlerecall = () => {
    if (callcomm) {
      setcallcomm(false);
    } else {
      setcallcomm(true);
    }
  };
  // ngăn ko cho heaeder acc rerender khi đang ở cùng user_id
  const test = useMemo(() => {
    return datavideo;
  }, [change]);

  // kiểm tra từ đâu vào để lấy ra list video
  const VideoListwhenclicknexvideo = () => {
    // if (profilepage.page === "/") {
    //   return videolis && videolis;
    // } else {
    //   return videocreattor && videocreattor;
    // }
    switch (profilepage.page) {
      case "/":
        return videolis && videolis;
        break;
      case "/following":
        return videolis && videolis;
        break;
      case "/friends":
        return videolis && videolis;
        break;
      default:
        return videocreattor && videocreattor;
        break;
    }
  };

  const nextpage = () => {
    setpage(page + 1);
  };
  return (
    <SearchContexApi>
      <div className={cx("wrapper")}>
        <div className={cx("videopast")}>
          <div
            className={cx("background")}
            style={{ background: `url(${link}) no-repeat center /cover` }}
          ></div>
          <div className={cx("overlay")}></div>

          <VideoTag
            // muted
            ref={videoblockref}
            className={"detailvideo"}
            onclicplaypause
            onlodedplay
            src={IPHTTP + datavideo.file_url}
            // onlodedplay
          ></VideoTag>
          {videoref !== undefined && (
            <VideodetailControl
              videoelement={videoref}
              data={
                VideoListwhenclicknexvideo() && VideoListwhenclicknexvideo()
              }
              currentVideo={datavideo && datavideo.id}
              nexpage={nextpage}
            />
          )}
        </div>
        <div className={cx("contentpast")}>
          <div className={cx("acclock")}>
            {
              <HomeHeader
                className={"videodetail"}
                data={test && test.user && test}
                id_current_user={detailluserlogin.id}
              />
            }
          </div>
          <div className={cx("btnactive")}>
            <Videobtnactive
              video_id_liked={CheckVideoLiked(
                listLikeduser,
                datavideo.id && datavideo.id
              )}
              deletelastitem
              data={datavideo}
              className={"videodetailBtnactive"}
            />
            <div className={cx("shareApp")}>
              <Shareblock videodetaill />
            </div>
          </div>
          <div className={cx("linkVideo")}>
            <input
              type={"text"}
              readOnly
              ref={linkref}
              value={IPHTTP + datavideo.file_url}
            ></input>
            <button onClick={handlecoppy}>Copy link</button>
          </div>
          <div className={cx("nameblock")}>
            <div
              onClick={() => setcommentLayout(true)}
              style={{ fontWeight: commentLayout ? "bold" : "initial" }}
            >
              <p>
                Comments (<span> {commentlist.length} </span>)
              </p>
            </div>
            <div
              onClick={() => setcommentLayout(false)}
              style={{ fontWeight: commentLayout ? "initial" : "bold" }}
            >
              <p>Creator Videos</p>
            </div>
            <p
              style={{
                transform: commentLayout ? "" : "translateX(100%)",
              }}
              className={cx("line")}
            ></p>
          </div>
          {commentLayout ? (
            <div className={cx("commentlock")}>
              <Comments data={commentlist} />
              <WriteComment
                recallcomment={handlerecall}
                videoid={datavideo.id}
                onclick={handlog}
              />
            </div>
          ) : (
            <div className={cx("createtorlock")}>
              {videocreattor.length > 0 &&
                videocreattor.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/videos/${item.id}`}
                      className={cx("creatitem")}
                      onClick={() => {
                        setdatavideo(item);
                        profilepage.page = `/@${
                          datavideo && datavideo.user.nickname
                        }`;
                      }}
                    >
                      <VideoTag src={IPHTTP + item.file_url} />
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
        {log && (
          <div onClick={closelog} className={cx("log")}>
            <LoginRegister />
          </div>
        )}
        <Pretop className={"detailvideo"} />
      </div>
    </SearchContexApi>
  );
}
export default VideoDetail;
