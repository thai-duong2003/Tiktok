import style from "./deleteblock.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { DeleteVideosevice } from "~/Services/VideoService/DeleteVideoService";
const cx = classNames.bind(style);
function Deleteblock({ onclick, id_video, id_user }) {
  const [deleteVideo, setdeleteVideo] = useState(false);
  const [callapi, setcallapi] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await DeleteVideosevice(id_video, id_user);
        setcallapi(true);
      } catch (err) {
        setcallapi(err);
      }
    };
    deleteVideo && fetchApi();
  }, [deleteVideo]);
  if (callapi) {
    setTimeout(() => {
      document.location = "/Tiktok/";
    }, 300);
  }
  const handle_click_btn_delete = () => {
    setdeleteVideo(true);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <h3>Bạn có chắc chắn muốn xóa video này?</h3>
        <button className={cx("delete_btn")} onClick={handle_click_btn_delete}>
          Xóa
        </button>
        <button onClick={onclick}>Hủy</button>
      </div>
    </div>
  );
}
export default Deleteblock;
