import PropTypes from "prop-types";

import Button from "../Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
function MenuItem({ data, onClick, morevideo = false }) {
  const classes = cx("menu-item", { separate: data.separate, morevideo }); //them cais class cuoi dder lm border

  return (
    <Button
      className={classes}
      lefticon={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}
MenuItem.propTypes = {
  // data: PropTypes.object,
  onClick: PropTypes.func,
};
export default MenuItem;
