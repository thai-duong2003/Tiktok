import classNames from "classnames/bind";
import styles from "./SuggesteAcount.module.scss";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { Wrapper } from "../popper";
import AccountPreview from "./AcountPrevew/AcountPreview";
import { IPHTTP } from "~/utils/httprequest";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Acountitem({ data }) {
  return (
    <div>
      <Tippy
        interactive
        delay={[500, 0]}
        placement="bottom"
        render={(props) => (
          <div tabIndex="-1" {...props}>
            <Wrapper>
              <AccountPreview data={data} />
            </Wrapper>
          </div>
        )}
      >
        <Link to={`/@${data.nickname}`} className={cx("acount-item")}>
          <Image className={cx("avatar")} src={IPHTTP + data.avatar} />
          <div className={cx("item-info")}>
            <p className={cx("nickname")}>
              <strong>{data.nickname}</strong>
              {data.tick === "true" && (
                <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
              )}
            </p>
            <p className={cx("name")}>{data.name}</p>
          </div>
        </Link>
      </Tippy>
    </div>
  );
}
export default Acountitem;
