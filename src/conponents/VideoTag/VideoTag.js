import styles from "./VideoTag.module.scss";
import classNames from "classnames/bind";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { setconfig } from "~/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function VideoTag(
  {
    className,
    src,
    mouseOverAutoPlay = false,
    mouseOutAutoPause = false,
    onlodedplay = false,
    muted = false,
    playbtn = true,
    onclicplaypause = false,
    children,
  },
  videotagref
) {
  // Lưu ý : google ko cho phép tự động phat  có âm thanh khi chua tuong tác voi document nen pjai cho muted vào
  const videoref = useRef();

  const [isplay, setplay] = useState(true);

  setconfig("isplayvideotag", isplay);

  const play = () => {
    videoref.current.play();
  };
  const pause = () => {
    const videolay = videoref.current.play();
    if (videolay !== undefined) {
      videolay
        .then((_) => {
          videoref.current.pause();
        })
        .catch((err) => {});
    }
  };
  const handleclick = () => {
    if (isplay) {
      pause();
    } else {
      play();
    }
    setplay(!isplay);
  };
  const noactive = () => {};
  const clases = cx("wrapper", { [className]: className });

  window.onblur = (e) => {
    // khi bấm sang tab khác thì video sẽ tự động dừng
    videoref.current && videoref.current.pause();
  };
  window.onfocus = (e) => {
    // khi đang ở tab này thì video sẽ tự động phats

    videoref.current && videoref.current.play();
  };
  return (
    <div
      ref={videotagref}
      className={clases}
      onMouseOver={mouseOverAutoPlay ? play : noactive}
      onMouseOut={mouseOutAutoPause ? pause : noactive}
      onClick={onclicplaypause ? handleclick : noactive}
    >
      <video
        muted={muted === true ? false : true}
        ref={videoref}
        src={src}
        loop
        onLoadedData={onlodedplay ? play : noactive}
      />

      {playbtn && !isplay && (
        <div className={cx("playpause", !isplay && "hide")}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      )}
      {children}
    </div>
  );
}
export default forwardRef(VideoTag);
