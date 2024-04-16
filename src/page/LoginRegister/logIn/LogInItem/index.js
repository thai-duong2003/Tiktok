import "./style.scss";
import Button from "../../assets/button";
import Input from "../../assets/input";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { CheckEmail } from "../../assets/emailCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "~/hook/useDebounce";
import * as loginservice from "~/Services/loginservice";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Loading from "~/conponents/loading/Loading";

export default function LogInItem({ onUserShow, userShow, hide }) {
  const [email, setEmail] = useState(""); //thaiq9577@gmail.com
  const [password, setPassword] = useState(""); //1234567
  const [isError, setIsError] = useState(false);
  const [isEmty, setIsEmty] = useState(false);
  const [isEmtyPass, setIsEmtyPass] = useState(false);
  const [senbtn, setsenbtn] = useState(false);
  const [post, setpost] = useState("");
  const [callapierr, setcallapierr] = useState("");
  const [loading, setloading] = useState(false);
  const emaildeboune = useDebounce(email, 500);
  const passdeboune = useDebounce(password, 500);

  const { setdata_login_success, btnlikeactive, likeBtn } =
    useContext(Appcontext);
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

  useEffect(() => {
    if (!emaildeboune.trim() && !passdeboune.trim()) {
      setpost([]);
      return;
    }

    //call api login
    const callapi = async () => {
      try {
        setloading(true);
        const resuilt = await loginservice.login(emaildeboune, passdeboune);

        setdata_login_success(resuilt.data);
        setpost(true);
        setloading(false);
      } catch (err) {
        setpost("err");
        setloading(false);
      }
    };
    callapi();
  }, [senbtn]);

  // call api false
  if (post === "err") {
    setTimeout(() => {
      handler_when_call_api_fales();
    }, 100);
  }
  const handler_when_call_api_fales = () => {
    setcallapierr("Email hoặc mật khẩu không chính xác");
  };

  const handleLogIn = () => {
    if (email === "") {
      setIsEmty(true);
    }
    if (password === "") {
      setIsEmtyPass(true);
    }
    if (
      email !== "" &&
      password !== "" &&
      isEmty === false &&
      isEmtyPass === false &&
      isError === false
    ) {
      senbtn ? setsenbtn(false) : setsenbtn(true);
    }
  };
  const handlerblur = (e) => {
    switch (e.target.type) {
      case "email":
        email === "" ? setIsEmty(true) : setIsEmty(false);
        break;
      case "password":
        password === "" ? setIsEmtyPass(true) : setIsEmtyPass(false);
        break;
      default:
        return;
    }
  };
  return (
    <div className={userShow ? "logInUser" : "logInUserNone"}>
      <div className="logInUser_wrapper">
        <div className="logInUser_wrapper-body">
          <h2>Đăng nhập</h2>

          <form>
            <Input
              label="Email: "
              placeholder="Nhập email"
              type="email"
              value={email}
              onblur={handlerblur}
              onChange={(e) => setEmail(e.target.value)}
              isError={isError ? "Vui lòng nhập đúng định dạng " : ""}
              isEmty={isEmty ? "Vui lòng nhập email" : ""}
            />
            <Input
              label="PassWord: "
              placeholder="Nhập passWord"
              type="password"
              onblur={handlerblur}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isEmtyPass={isEmtyPass ? "Vui lòng nhập PassWord" : ""}
            />
          </form>
          <p className="Callapierr">{callapierr}</p>
          <div className="logInUser_wrapper-footer">
            <Button name="Log In" onClick={handleLogIn} />
          </div>
        </div>

        <div className="logInUser_wrapper-head">
          <span onClick={onUserShow}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
        {loading && (
          <div className={"loadingicon"}>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
