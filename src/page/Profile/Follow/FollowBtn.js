import { useContext, useEffect, useState } from "react";
import Button from "~/conponents/Button";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { followAndUnfollow, FollowingList } from "~/Services/Flollowservice";

function FollowBtn({
  children,
  text = false,
  outline = false,
  followingUserId,
  className,
  primary,
}) {
  const { detailluserlogin, handlerecallapi } = useContext(Appcontext);
  const [clickfollowbtn, setclickfollowbtn] = useState(false);
  const handleclickflobtn = () => {
    detailluserlogin === ""
      ? setclickfollowbtn(false)
      : setclickfollowbtn(true);
  };
  useEffect(() => {
    const callapi = async () => {
      try {
        await followAndUnfollow(detailluserlogin.id, followingUserId);
        setclickfollowbtn(false);
        handlerecallapi();
      } catch {}
    };
    clickfollowbtn && detailluserlogin && callapi();
  }, [clickfollowbtn]);

  return (
    <Button
      outline={outline}
      text={text}
      primary={primary}
      className={className}
      onClick={() => {
        handleclickflobtn();
      }}
    >
      {/* {children} */}
      {clickfollowbtn ? <span className={"spinner-border"}></span> : children}
    </Button>
  );
}
export default FollowBtn;
