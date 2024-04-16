import { useState } from "react";
import Rigister from "./rigister";
import LogIn from "./logIn";
import classNames from "classnames/bind";
import styles from "./loginregister.module.scss";

const cx = classNames.bind(styles);
function LoginRegister() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      // className={cx("logregis")}
    >
      {show ? <Rigister onShow={handleShow} /> : <LogIn onshow={handleShow} />}
    </div>
  );
}
export default LoginRegister;
