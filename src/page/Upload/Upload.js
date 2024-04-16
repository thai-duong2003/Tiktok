import classNames from "classnames/bind";
import images from "~/access/image";
import { Wrapper } from "~/conponents/popper";
import Videobtnactive from "~/conponents/Videobtnactive";
import styles from "./Upload.module.scss";
import Image from "~/conponents/Image";
import VideoTag from "~/conponents/VideoTag";
import Button from "~/conponents/Button";
import { IPHTTP } from "~/utils/httprequest";
import { useRef, useState, useContext, useMemo, useEffect } from "react";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import useDebounce from "~/hook/useDebounce";
import VideoThumbnail from "react-video-thumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Uploadservice } from "~/Services/VideoService/uploadservices";

import axios from "axios";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Upload({ sa }) {
  const Data = {
    like_count: 6,
    comment_count: 12,
    favourite_count: 12,
    share_count: 12,
  };
  const musicref = useRef();
  const [ifofile, setifofile] = useState("");
  const [discription, setdiscription] = useState("");
  const { detailluserlogin, btnlikeactive } = useContext(Appcontext);
  const [thumnailurllist, setthumnailurllist] = useState("");
  const [thumnailurl, setthumnailurl] = useState("");
  const [thumnailseclect, setthumnailseclect] = useState("");
  const [music, setmusic] = useState("");
  const [upload, setupload] = useState(false);
  const [status, settatus] = useState("");
  const thumsecon = [1, 2, 3, 4, 5, 6];
  const handleselectvideo = (e) => {
    if (e.target.value === "") {
      // select ko co file
      setdiscription(ifofile.name.slice(0, -4));
      setthumnailurl(window.URL.createObjectURL(ifofile));
    } else {
      // select co file
      setthumnailurl("");
      setifofile(e.target.files[0]);
      setdiscription(e.target.files[0].name.slice(0, -4));
      setthumnailurl(window.URL.createObjectURL(e.target.files[0]));
      // setthumnailseclect("");
      setthumnailurllist("");
    }
  };

  const formData = new FormData();
  formData.append("file_url", ifofile);

  const handlechange = (e) => {
    if (!e.target.value.startsWith(" ")) {
      setdiscription(e.target.value);
    }
  };
  // call api up load video
  useEffect(() => {
    const callapi = async () => {
      try {
        await Uploadservice(
          discription,
          ifofile,
          detailluserlogin.id,
          thumnailseclect[1] + 1,
          music
        );
        settatus(true);
        btnlikeactive();
      } catch {
        settatus(false);
      }
    };
    ifofile && callapi();
  }, [upload]);

  const srcpath = useMemo(() => {
    if (ifofile) {
      return window.URL.createObjectURL(ifofile);
    }
  }, [ifofile]);

  const handlesubmit = () => {
    if (upload) {
      setupload(false);
    } else {
      setupload(true);
    }
    setmusic(musicref.current.innerText);
    window.history.back();
  };
  if (status) {
    setTimeout(() => {
      document.location = "/";
    }, 300);
  }
  return (
    <div className={cx("Upload")}>
      {ifofile === "" ? (
        <div className={cx("start_select")}>
          <label htmlFor={"start_file"} className={cx("start_file")}>
            <div>
              <FontAwesomeIcon icon={faCloudArrowUp} />
              <div className={cx("text")}>
                <h4>Chọn video để tải lên</h4>
                <p>Hoặc kéo và thả tập tin</p>
                <p>MP4 hoặc WebM</p>
                <p>Độ phân giải 720x1280 trở lên</p>
                <p>Tối đa 10 phút</p>
                <p>Nhỏ hơn 10 GB</p>
              </div>
              <div className={cx("button")}>Chọn tập tin</div>
            </div>
            <input
              id="start_file"
              type="file"
              name="file_url"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleselectvideo}
              onClick={() => {
                setthumnailurl("");
              }}
            />
          </label>
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("title")}>
            <h1>Tải video lên</h1>
            <span>Đăng video vào tài khoản của bạn</span>
          </div>

          <div className={cx("content")}>
            <div className={cx("file")}>
              <div
                className={cx("phone")}
                style={{ backgroundImage: `url(${images.phone})` }}
              >
                <div className={cx("video")}>
                  {" "}
                  <VideoTag muted src={srcpath} />
                </div>
                <div className={cx("avartar")}>
                  <Image
                    src={detailluserlogin && IPHTTP + detailluserlogin.avatar}
                  />
                </div>
                <div className={cx("Activevideo")}>
                  <Videobtnactive data={Data} />
                </div>

                <div className={cx("user")}>
                  <div>
                    <p
                      className={cx("nick")}
                    >{`@${detailluserlogin.nickname}`}</p>
                    <p>{discription}</p>
                    <p
                      className={cx("run")}
                      ref={musicref}
                    >{`Âm thanh gốc - ${detailluserlogin.nickname}`}</p>
                  </div>
                  <div className={cx("disc", "run")}>
                    <div>
                      {detailluserlogin &&
                        detailluserlogin.nickname.slice(0, 1)}
                    </div>
                  </div>
                </div>
                <div className={cx("contrl")}>
                  <img src={images.controlphone} alt="control"></img>
                </div>
              </div>

              <div className={cx("selectvideo")}>
                <p className={cx("Namefile")}>{ifofile && ifofile.name}</p>
                <label htmlFor={"file"}>
                  Thay đổi video
                  <input
                    id="file"
                    type="file"
                    name="file_url"
                    onChange={handleselectvideo}
                    onClick={() => {
                      setthumnailurl("");
                      setthumnailseclect("");
                    }}
                  />
                </label>
              </div>
            </div>
            <div className={cx("Description")}>
              <div className={cx("Mota")}>
                <p className={cx("Title")}>
                  <span className={cx("dau")}>Chú thích</span>

                  <span>
                    <span>{discription ? discription.length : 0}</span>/
                    <span>200</span>
                  </span>
                </p>
                <div className={cx("nhap")}>
                  <input
                    type="text"
                    name="description"
                    placeholder="Mô tả video"
                    value={discription}
                    onChange={handlechange}
                  />
                </div>
                <div className={cx("thumnailsblock")}>
                  <p>Ảnh bìa</p>
                  {
                    <div className={cx("thumnails")}>
                      {thumsecon.map((item, index) => {
                        const handleclickthumnail = (e) => {
                          setthumnailseclect([e.target.src, index]);
                        };
                        const get_lis_thum_url = (e) => {
                          setthumnailurllist([
                            ...thumnailurllist,
                            [e.target.src, index],
                          ]);
                          setthumnailseclect(thumnailurllist[0]);
                          // setmusic(musicref.current.innerText);
                        };

                        return (
                          <div
                            className={cx("thumnail_item")}
                            key={index}
                            onClick={handleclickthumnail}
                            onLoad={get_lis_thum_url}
                          >
                            {thumnailurl && (
                              <VideoThumbnail
                                videoUrl={thumnailurl}
                                snapshotAtTime={item}
                              />
                            )}
                          </div>
                        );
                      })}
                      {thumnailseclect && (
                        <div
                          className={cx("thumnailclick")}
                          style={{
                            transform: `translateX(calc(${thumnailseclect[1]} * 81px))`,
                          }}
                        >
                          {/* <Image src={thumnailseclect[0]} /> */}
                          <img src={thumnailseclect[0]} alt=""></img>
                        </div>
                      )}
                    </div>
                  }
                </div>
              </div>
              <div className={cx("Chedo")}>
                <p className={cx("dau")}>Ai có thể xem video này</p>
                <select>
                  <option>Cồng khai</option>
                  <option>Bạn bè</option>
                  <option>Riêng tư</option>
                </select>
              </div>
              <div className={cx("Chophep")}>
                <p className={cx("dau")}> Cho phép người dùng:</p>
                <span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={cx("checkbox")}
                  ></input>
                  <span> Bình luận</span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={cx("checkbox")}
                  ></input>
                  <span>Duet</span>
                </span>
                <span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={cx("checkbox")}
                  ></input>
                  <span>Ghép nối</span>
                </span>
              </div>
              <div className={cx("footer")}>
                <div>
                  <span className={cx("dau")}>Lên lịch cho video</span>
                  <input type="checkbox" className={cx("checkbox")}></input>
                </div>
                <div>
                  <span className={cx("dau")}>Khai báo nội dung bài đăng</span>
                  <input type="checkbox" className={cx("checkbox")}></input>
                </div>
                <div>
                  <span className={cx("dau")}>
                    Chạy quy trình kiểm tra bản quyền
                  </span>
                  <input type="checkbox" className={cx("checkbox")}></input>
                </div>
              </div>
              <p className={cx("cuoi")}>
                Chúng tôi sẽ kiểm tra xem video của bạn có sử dụng âm thanh vi
                phạm bản quyền hay không. Nếu chúng tôi phát hiện có vi phạm,
                bạn có thể chỉnh sửa video trước khi đăng
              </p>
              <div className={cx("dang")}>
                <Button to={"/"}>Hủy bỏ</Button>
                <input
                  className={cx("submit")}
                  onClick={handlesubmit}
                  type="submit"
                  value="Đăng"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Upload;
