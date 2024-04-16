import classNames from "classnames/bind";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import styles from "./Selectfileavatar.module.scss";
import Image from "~/conponents/Image";
import { SelectFileIcon } from "~/conponents/Icon/Icon";
const cx = classNames.bind(styles);

function Selectfileavatar({ avatar, setAvatar, currentavatar }) {
  const handleselectavatar = (e) => {
    if (e.target.value) {
      setAvatar(e.target.files[0]);
    }
  };
  const imgsrc = () => {
    if (avatar) {
      return window.URL.createObjectURL(avatar);
    }
  };

  return (
    <label htmlFor="avatar" className={cx("avatarblock")}>
      <Image src={avatar ? imgsrc() : currentavatar ? currentavatar : "/"} />
      <input
        type={"file"}
        id="avatar"
        name={"avatar"}
        accept="image/*"
        onChange={handleselectavatar}
      />
      <span className={cx("selectfileicon")}>
        <SelectFileIcon />
      </span>
    </label>
  );
}
export default Selectfileavatar;
