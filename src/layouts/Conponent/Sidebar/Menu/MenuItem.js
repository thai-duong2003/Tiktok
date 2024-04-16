import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Image from "~/conponents/Image";
import { IPHTTP } from "~/utils/httprequest";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { useContext } from "react";
/* cái này nó sẽ giúp để có thẻ lm dc việc khi bấm vào thì nó có thực hiện them 1 vài cong việc
 cách hoạt đọng của NavLink: nó sẽ lấy cái path ở thanh tìm kiếm của gougle rồi so sánh với cái to mà ta chuyenf vào 
 cái nào giống nhau thì nó sẽ tự đọng thêm class active vào phần tử có cái to đấy */
const cx = classNames.bind(styles);

function MenuItemSidebar({
  title,
  to,
  icon,
  activeicon,
  image = false,
  className,
  onclick,
}) {
  const { detailluserlogin } = useContext(Appcontext);

  return (
    <NavLink
      onClick={onclick}
      to={to}
      className={(nav) =>
        cx("Menu-Item", { active: nav.isActive }, { [className]: className })
      }
    >
      {/*phải viết class như này thì nó ms chay dc cái active  */}
      <span className={cx("icon")}>{icon}</span>
      <span className={cx("active-icon")}>{activeicon}</span>
      {image && <Image src={IPHTTP + detailluserlogin.avatar} />}
      <p className={cx("title")}>{title}</p>
    </NavLink>
  );
}
export default MenuItemSidebar;
