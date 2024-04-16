import styles from "./Regidteruser.module.scss";
import classNames from "classnames/bind";
import { v4 as uuidv4 } from "uuid";
// import Button from "../../assets/button";
import Button from "~/conponents/Button";
import Input from "../../assets/input";
import { CheckEmail } from "../../assets/emailCheck";
import React, { memo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { IPHTTP } from "~/utils/httprequest";
import useDebounce from "~/hook/useDebounce";
import Image from "~/conponents/Image";
import { HomeIcon, SelectFileIcon } from "~/conponents/Icon/Icon";
import { CreateUser } from "~/Services/User/createUserService";
import Selectfileavatar from "./selectfileavatar";

const cx = classNames.bind(styles);
function RigisterUser({
  userShow,
  onUserShow,
  setuserShow,
  showLoginOrRegister,
}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [nickName, setNickName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isError, setIsError] = useState(true);
  const [isEmty, setIsEmty] = useState(false);
  const [isEmtyPass, setIsEmtyPass] = useState(false);
  const [isEmtyName, setIsEmtyName] = useState(false);
  const [isEmtyNickName, setIsEmtyNickName] = useState(false);
  const [creteFalse, setcreteFalse] = useState(false);
  const [createSuccess, setcreateSuccess] = useState(false);
  const [nextslide, setnextslide] = useState(false);
  const [clickSubmitbtn, setclickSubmitbtn] = useState(false);
  const [notication, setnotication] = useState("");
  const [errtextEmail, seterrtextEmail] = useState("");
  const [callapiLoading, setcallapiLoading] = useState(false);

  const Emailvaule = useDebounce(email, 300);
  // const passWordvaule = useDebounce(passWord, 500);
  const handleSubmit = () => {
    if (clickSubmitbtn) {
      setclickSubmitbtn(false);
    } else {
      setclickSubmitbtn(true);
    }
  };
  useEffect(() => {
    if (!userName) {
      setIsEmtyName(true);
      return;
    } else {
      setIsEmtyName(false);
    }
  }, [userName]);

  useEffect(() => {
    if (!passWord) {
      return setIsEmtyPass(true);
    } else {
      return setIsEmtyPass(false);
    }
  }, [passWord]);

  useEffect(() => {
    if (!nickName) {
      return setIsEmtyNickName(true);
    } else {
      return setIsEmtyNickName(false);
    }
  }, [nickName]);
  useEffect(() => {
    if (!email) {
      return setIsEmty(true);
    } else {
      return setIsEmty(false);
    }
  }, [Emailvaule]);
  useEffect(() => {
    if (email) {
      const ischeckEmail = CheckEmail(email);
      if (!ischeckEmail) {
        setIsError(true);
        return;
      } else {
        setIsError(false);
      }
    }
  }, [email]);

  //call api create user

  useEffect(() => {
    const callapi = async () => {
      try {
        setcallapiLoading(true);
        const resuilt = await CreateUser(
          email,
          passWord,
          userName,
          nickName,
          avatar
        );

        setnotication(resuilt.data ? resuilt.data : "success");
        setcreateSuccess(true);
        setcreteFalse(false);
        setuserShow(false);
        setcallapiLoading(false);
      } catch (err) {}
    };

    if (email && userName && passWord && nickName && !isError) {
      callapi();
    }
  }, [clickSubmitbtn]);

  //  xư lý khi call đúng hoặc sai
  useEffect(() => {
    if (notication) {
      if (notication.email) {
        // khi lôi email
        seterrtextEmail("Email đã tồn tại hoặc không đúng định dạng");
        setnextslide(false);
        setcreateSuccess(false);
        setcreteFalse(true);
        setuserShow(true);
      }
      if (notication === "success") {
        //khi thanh công
        showLoginOrRegister();
      }
    }
  }, [notication]);
  const checkbtn = () => {
    if ((isEmtyPass, isError)) {
      return "disible";
    }
    if ((isError, isEmtyPass)) {
      return "disible";
    }
  };

  const handlenextbtn = (e) => {
    e.preventDefault();
    if (!isError && !isEmtyPass) {
      setnextslide(true);
    }
  };

  return (
    <div
      className={cx(
        userShow ? "rigisterUser" : "rigisterUserNone"
        // "rigisterUser"
      )}
    >
      <div className={cx("rigisterUser_Main")}>
        <div className={cx("header")}>
          <div style={{ width: "40px" }}>
            {nextslide && (
              <span
                className={cx("leftArrow")}
                onClick={() => {
                  setnextslide(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            )}
          </div>

          <div className={cx("rigisterUser_Main-title")}>
            <h2>Sign up</h2>
            {creteFalse ? (
              <h3 className={cx("isFormValid")}>Đăng ký không thành công</h3>
            ) : (
              ""
            )}
            {createSuccess ? (
              <h3 className={cx("isFormSuccess")}>Đăng ký thành công</h3>
            ) : (
              ""
            )}
          </div>
          <div className={cx("rigisterUser_Main-delete")} onClick={onUserShow}>
            <span>
              <FontAwesomeIcon icon={faX} />
            </span>
          </div>
        </div>

        <div className={cx("form")}>
          <div
            className={cx("row", nextslide && "nextslide")}
            style={{ flexWrap: "nowrap" }}
          >
            <div className={cx("account", "col-xl-12")}>
              <Input
                label="Email : "
                placeholder="Nhập email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  seterrtextEmail("");
                }}
                isError={
                  errtextEmail
                    ? errtextEmail
                    : isError
                    ? "Vui lòng nhập đúng định dạng "
                    : ""
                }
                isEmty={isEmty ? "Vui lòng nhập email" : ""}
                name="email"
              />
              <Input
                label="PassWord : "
                placeholder="Nhập passWord"
                type="text"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                isEmtyPass={isEmtyPass ? "Vui lòng nhập PassWord" : ""}
                name="password"
              />
              <span className={cx("nextbtn", checkbtn())}>
                <Button large primary onClick={handlenextbtn}>
                  Next
                </Button>
              </span>
            </div>
            <div className={cx("infoName", "col-xl-12")}>
              {/* <label htmlFor="avatar" className={cx("avatarblock")}>
                <Image src={avatar ? imgsrc() : "/"} />
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
              </label> */}
              <Selectfileavatar avatar={avatar} setAvatar={setAvatar} />
              <Input
                label="Name: "
                placeholder="Nhập tên tài khoản"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                isEmtyName={isEmtyName ? "Vui lòng nhập tên " : ""}
                name="name"
              />

              <Input
                label="NickName: "
                placeholder="Nhap nickName"
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                isEmtyNickName={isEmtyNickName ? "Vui lòng nhập nickName" : ""}
                name="nickname"
              />

              <div className={cx("rigisterUser_Main-submit")}>
                <Button
                  onClick={handleSubmit}
                  large
                  primary
                  lefticon={
                    callapiLoading && <span className={"spinner-border"}></span>
                  }
                >
                  {callapiLoading ? "" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(RigisterUser);
