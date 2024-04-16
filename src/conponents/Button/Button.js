import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Button({
  children,
  to,
  href,
  className,
  primary = false,
  text = false,
  outline = false,
  lefticon = false,
  righticon = false,
  cricle = false,
  Videobtnactive = false,
  large = false,
  onClick,
}) {
  let Butt = "button";
  const props = {};
  if (to) {
    props.to = to;
    Butt = Link;
  }
  if (href) {
    props.href = href;
    Butt = "a";
  }
  const classes = cx("wrapper", {
    [className]: className,
    primary,
    text,
    outline,
    large,
    cricle,
    Videobtnactive,
  });
  return (
    <Butt className={classes} {...props} onClick={onClick}>
      {lefticon && <span className={cx("icon")}>{lefticon}</span>}
      <span>{children}</span>
      {righticon && <span className={cx("icon")}>{lefticon}</span>}
    </Butt>
  );
}
export default Button;
