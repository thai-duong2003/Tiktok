import classNames from "classnames/bind";
import Button from "../Button";
import { Pretopicon } from "../Icon/Icon";
import styles from "./Pretop.module.scss";
const cx = classNames.bind(styles);
function Pretop({ className }) {
  return (
    <div className={cx("wrapper", { [className]: className })}>
      <Button href={"#"} lefticon={<Pretopicon />}></Button>
    </div>
  );
}
export default Pretop;
