import classNames from "classnames/bind";
import { useEffect, useRef, useState, useContext } from "react";
import { Acongicon, EmoineIcon } from "~/conponents/Icon/Icon";
import styles from "./WriteComment.module.scss";
import useDebounce from "~/hook/useDebounce";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { CreateComment } from "~/Services/commentService/CreateComment";
const cx = classNames.bind(styles);

function WriteComment({ videoid, onclick, recallcomment }) {
  const [commentvalue, setcommentvalue] = useState("");
  const [senbtn, setsenbtn] = useState(false);
  const [place, setplace] = useState(true);

  const debounce = useDebounce(commentvalue, 500);
  const { detailluserlogin, btnlikeactive } = useContext(Appcontext);
  if (detailluserlogin) {
    onclick();
  }

  // calll api create comment
  useEffect(() => {
    if (!debounce.trim()) {
      return;
    }
    const b = async () => {
      try {
        await CreateComment(
          debounce,
          detailluserlogin && detailluserlogin.id,
          videoid
        );
        btnlikeactive();
      } catch (err) {}
      inutref.current.innerText = "";
      recallcomment();
      if (inutref.current.innerText.trim().length === 0) {
        setplace(true);
      }
    };
    if (inutref.current.innerText.trim().length > 0) {
      b();
      setplace(true);
    }
  }, [senbtn]);
  const inutref = useRef();
  const handlesend = (e) => {
    if (commentvalue !== "") {
      senbtn ? setsenbtn(false) : setsenbtn(true);
    }
  };

  const handleonkeydown = (e) => {
    if (e.target.innerText === " ") {
      e.target.innerText = "";
    } else {
      const contentComment = e.target.innerText;

      setcommentvalue(contentComment);
      setplace(false);
    }
    if (e.target.innerText.trim().length === 0) {
      setplace(true);
    }
  };
  return (
    <div className={cx("wrappper")}>
      <div>
        {/* <input
          className={cx("input")}
          ref={inutref}
          type={"text"}
          placeholder="Thêm bình luận ..."
          spellCheck={false}
          required
          name="content"
          onChange={handleChange}
        /> */}
        {place && <span className={cx("placehoder")}>Thêm bình luận ...</span>}
        <div
          ref={inutref}
          className={cx("iputcomment")}
          contentEditable="true"
          suppressContentEditableWarning={true}
          // role={"textbox"}
          spellCheck="false"
          name="content"
          aria-multiline
          onKeyUp={handleonkeydown}
        ></div>
        <div>
          <span>
            <Acongicon />
          </span>
          <span>
            <EmoineIcon />
          </span>
        </div>
      </div>
      <button onClick={detailluserlogin !== "" ? handlesend : onclick}>
        Đăng
      </button>
    </div>
  );
}
export default WriteComment;
