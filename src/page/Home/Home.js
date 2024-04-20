import classNames from "classnames/bind";
import Contentmain from "./Contentmain";
import { useContext, useEffect, useState } from "react";
import * as userServices from "~/Services/VideoService/Videoservice";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import styles from "./Home.module.scss";
import { backpage } from "../Profile/Profile";

const cx = classNames.bind(styles);

function Home() {
  const [video, setvideo] = useState([]);
  const [page, setpage] = useState(1);
  const { likeBtn } = useContext(Appcontext);

  //call api get video list
  useEffect(() => {
    const fetchApi = async () => {
      const resuilt = await userServices.Video({ page: page });
      setvideo(resuilt);
    };
    fetchApi();
  }, [page, likeBtn]);
  backpage("/Tiktok");
  document.title = "TikTok - Make Your Day";

  return (
    <div className={cx("wrapper")}>
      <Contentmain video={video} page={page} setpage={setpage} />
    </div>
  );
}
export default Home;
