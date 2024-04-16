import classNames from "classnames/bind";
import styles from "./Volume.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { Volumeicon } from "../Icon/Icon";
import { useRef, useState, useEffect } from "react";

import { config, setconfig } from "~/App";

const cx = classNames.bind(styles);

function Volume({ element, classnames }) {
  const [ismuted, setismuted] = useState(
    config.ismute === undefined ? true : config.ismute
  );
  const [ishovervolume, setishovervolume] = useState(false);
  const [valuevo, setvaluevo] = useState(config.volumValue);
  const volumref = useRef();
  // setconfig("ismute", ismuted); //muted
  config.ismute = ismuted;

  const onvolum = () => {
    element.volume = config.volumValue === undefined ? 1 : config.volumValue;
    setvaluevo(config.volumValue === undefined ? 1 : config.volumValue);
    setismuted(false);
    if (config.volumValue === undefined) {
      config.volumValue = 1;
    }
  };

  const offvolum = () => {
    element.volume = 0;
    setismuted(true);
  };

  let val = config.ismute === true ? "0" : (valuevo / 1) * 100 + "%";
  var change = (e) => {
    var volumevalue = e.target.value;
    setconfig("volumValue", volumevalue);
    setvaluevo(() => config.volumValue);
    setismuted(false);

    // element.volume = config.volumValue;
  };
  useEffect(() => {
    element.volume = valuevo;
  }, [config.volumValue]);

  element.muted = ismuted;

  return (
    <div
      className={cx("volume", { [classnames]: classnames })}
      onMouseOver={() => setishovervolume(true)}
      onMouseOut={() => setishovervolume(false)}
    >
      {/* thanh volum value  */}
      {ishovervolume && (
        <div className={cx("changevolum")}>
          <div className={cx("ranslider")}>
            <input
              ref={volumref}
              value={
                config.ismute === true || valuevo === undefined ? "0" : valuevo
              }
              type="range"
              min="0"
              max="1"
              step="0.1"
              onChange={change}
              className={cx("input")}
            />
            <div className={cx("around")} style={{ left: `${val}` }}></div>
            <div
              className={cx("volumeactive")}
              style={{ width: `${val}` }}
            ></div>
          </div>
        </div>
      )}

      {/* btn loa */}
      {ismuted ? (
        <button onClick={onvolum}>
          <FontAwesomeIcon icon={faVolumeXmark} />
        </button>
      ) : (
        <button onClick={offvolum}>
          <Volumeicon />
        </button>
      )}
    </div>
  );
}
export default Volume;
