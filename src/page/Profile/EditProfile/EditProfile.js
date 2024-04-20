import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/conponents/Button";
import { Wrapper } from "~/conponents/popper";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Input from "~/page/LoginRegister/assets/input";
import Selectfileavatar from "~/page/LoginRegister/rigister/rigisterUser/selectfileavatar";
import { Updateaccount } from "~/Services/User/createUserService";
import { IPHTTP } from "~/utils/httprequest";
import styles from "./EditProfile.module.scss";
const cx = classNames.bind(styles);

function EditProfile({ onclick }) {
  const { detailluserlogin, setsearch_user_click, handlerecallapi } =
    useContext(Appcontext);

  const [avatar, setAvatar] = useState("");
  const [nickname, setnickname] = useState(detailluserlogin.nickname);
  const [userName, setuserName] = useState(detailluserlogin.name);
  const [bio, setbio] = useState(detailluserlogin.bio);
  const [clicksavebtn, setclicksavebtn] = useState(false);
  const reflink = useRef();
  useEffect(() => {
    const callapi = async () => {
      try {
        await Updateaccount(
          detailluserlogin.id,
          userName,
          nickname,
          avatar && avatar,
          bio
        );
        onclick();
        setsearch_user_click(`/@${nickname}`);
        reflink && reflink.current.click();
        handlerecallapi();
      } catch {}
    };
    userName && nickname && clicksavebtn && callapi();
  }, [clicksavebtn]);
  console.log(clicksavebtn);
  console.log(avatar);
  const handlesavebtn = () => {
    if (clicksavebtn) {
      setclicksavebtn(false);
    } else {
      setclicksavebtn(true);
    }
  };
  return (
    <div className={cx("", "")} onClick={onclick}>
      <Link ref={reflink} to={`/Tiktok/@${nickname}`} />
      <div className={cx("wrapper")}></div>
      <div
        className={cx("block")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Wrapper>
          <div className={cx("header", "line_bottom")}>
            <h1>Edit profile</h1>
            <span className={cx("close")} onClick={onclick}>
              <FontAwesomeIcon icon={faClose} />
            </span>
          </div>
          <div className={cx("conten")}>
            <div className={cx("row", "item")}>
              <div className={cx("col-xl-4", "name_lable")}>Profile photo</div>
              <div className={cx("col-xl-8", "valueblock")}>
                <Selectfileavatar
                  avatar={avatar}
                  setAvatar={setAvatar}
                  currentavatar={IPHTTP + detailluserlogin.avatar}
                />
              </div>
            </div>
            <div className={cx("row", "item")}>
              <div className={cx("col-xl-4", "name_lable")}>Username</div>
              <div className={cx("col-xl-8", "valueblock")}>
                <div className={cx("input")}>
                  <Input
                    type={"text"}
                    value={nickname}
                    className={"editprofile"}
                    onChange={(e) => {
                      setnickname(e.target.value);
                    }}
                    isEmtyName={
                      nickname
                        ? ""
                        : "This username isn’t available. Please enter a new one."
                    }
                  />
                  <p>www.tiktok.com/@ Usernames</p>
                  <p>
                    can only contain letters, numbers, underscores, and periods.
                    Changing your username will also change your profile link
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("row", "item")}>
              <div className={cx("col-xl-4", "name_lable")}>Name</div>
              <div className={cx("col-xl-8", "valueblock")}>
                <div className={cx("input")}>
                  <Input
                    type={"text"}
                    value={userName}
                    className={"editprofile"}
                    onChange={(e) => {
                      setuserName(e.target.value);
                    }}
                    isEmtyName={userName ? "" : "Please enter a new one."}
                  />
                  <p>Your nickname can only be changed once every 7 days</p>
                </div>
              </div>
            </div>
            <div className={cx("row", "item")}>
              <div className={cx("col-xl-4", "name_lable")}>Bio</div>
              <div className={cx("col-xl-8", "valueblock")}>
                <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => {
                    setbio(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={cx("footer")}>
              <Button text onClick={onclick}>
                Cancel
              </Button>
              <Button primary className={"small"} onClick={handlesavebtn}>
                Save
              </Button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
export default EditProfile;
