import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { setconfig } from "~/App";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { Wrapper } from "../popper";
import HeaderMenu from "./Headermenu";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);
const defaultfn = () => {};

function Menu({
  children,
  items = [],
  X,
  Y,
  hideOnClick = false,
  onchange = defaultfn,
  isright = false,
}) {
  const [history, sethistory] = useState([{ data: items }]);
  const curren = history[history.length - 1];
  const {
    setdata_login_success,
    setsearch_user_click,
    detailluserlogin,
    setdetailluserlogin,
    btnlikeactive,
  } = useContext(Appcontext);

  useEffect(() => {
    sethistory([{ data: items }]);
  }, [items]);
  const renderitems = () => {
    return curren.data.map((item, index) => {
      const isparent = !!item.submenu;

      return (
        <MenuItem
          key={index}
          data={item}
          morevideo={isright}
          onClick={() => {
            if (isparent) {
              sethistory((pre) => [...pre, item.submenu]);
            } else {
              onchange(item);
            }

            switch (item.title) {
              case "log out":
                {
                  setconfig("token_login", "");
                  setdata_login_success("");
                }
                break;
              case "view profile":
                {
                  setsearch_user_click(`/@${detailluserlogin.nickname}`);
                }
                break;
              default:
                return;
            }
          }}
        />
      );
    });
  };
  const map = isright ? "right" : "bottom-end";
  const placement = [X, Y];
  return (
    <Tippy
      interactive
      offset={X === undefined && Y === undefined ? [15, 8] : placement}
      delay={[0, 500]}
      placement={map}
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <Wrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <HeaderMenu
                title={curren.title}
                onback={() => sethistory((pre) => pre.slice(0, pre.length - 1))}
              />
            )}
            <div className={cx("menu-body")}>{renderitems()}</div>
          </Wrapper>
        </div>
      )}
      onHide={() => sethistory((pre) => pre.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}
export default Menu;
