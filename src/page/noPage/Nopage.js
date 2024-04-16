import { HeaderOnly } from "~/layouts";
import classNames from "classnames/bind";
import styles from "./NoPage.module.scss";
import Header from "~/layouts/Conponent/Header/Header";
import ContexApi from "~/hook/context/Defaultcontextapi";
import { EmoineIcon, Playicon } from "~/conponents/Icon/Icon";
import images from "~/access/image";
import Button from "~/conponents/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function NoPage() {
  return (
    <ContexApi>
      <div className={cx("wrapper", "container-fluid")}>
        <div className={cx("row")}>
          <Header />
          <div className={cx("content")}>
            <div className={cx("err404")}>
              <h1>4</h1>
              <img src={images.laughimg} />
              <h1>4</h1>
            </div>
            <p>Couldn't find this page</p>
            <h2>Check out more trending videos on TikTok</h2>
            <span className={cx("button")}>
              <Button
                to={"/"}
                lefticon={<FontAwesomeIcon icon={faPlay} />}
                primary
                large
              >
                Watch now
              </Button>
            </span>
          </div>
        </div>
      </div>
    </ContexApi>
  );
}
export default NoPage;
