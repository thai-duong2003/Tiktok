import { createContext, useState, useEffect } from "react";
import { config, setconfig } from "~/App";
import { detailuser } from "~/Services/detailluserlogin";
import { FollowingList } from "~/Services/Flollowservice";
import { getListUserLikedVideo } from "~/Services/likeservices/getListUserLikedVideo";
export const Appcontext = createContext("");

function ContexApi({ children }) {
  // frofile and search
  const [search_user_click, setsearch_user_click] = useState(
    document.location.pathname.slice(7)
  );
  const [detailluserlogin, setdetailluserlogin] = useState("");
  const [data_login_success, setdata_login_success] = useState(false);
  const [loading_detail, setloading_detail] = useState(false);
  const [listLikeduser, setlistLikeduser] = useState("");
  const [likeBtn, setlikeBtn] = useState(false);
  const [followinguserlist, setfollowinguserlist] = useState([]);
  const [recallapi, setrecallapi] = useState(false);

  // detail user
  useEffect(() => {
    const b = async () => {
      try {
        setloading_detail(true);
        const resuilt = await detailuser(config.token_login);
        setdetailluserlogin(resuilt.data);
        setloading_detail(false);
      } catch (err) {
        setdetailluserlogin("");
        setloading_detail(false);
      }
      btnlikeactive();
    };
    setdata_login_success && b();
  }, [data_login_success, recallapi]);
  // login
  // api success
  if (data_login_success.token) {
    setconfig("token_login", data_login_success.token);
  }

  // call api user like video list

  useEffect(() => {
    const callApi = async () => {
      try {
        const resuilt = await getListUserLikedVideo(detailluserlogin.id);
        return setlistLikeduser(resuilt);
      } catch (err) {}
    };
    detailluserlogin.id | likeBtn && callApi();
  }, [detailluserlogin && likeBtn]);

  // call api user Following List

  useEffect(() => {
    const callapi = async () => {
      try {
        const resuilt = await FollowingList(detailluserlogin.id);
        setfollowinguserlist(resuilt);
      } catch {}
    };
    detailluserlogin && callapi();
  }, [detailluserlogin, recallapi]);

  const handlerecallapi = () => {
    if (recallapi) {
      setrecallapi(false);
    } else {
      setrecallapi(true);
    }
  };

  const btnlikeactive = () => {
    if (likeBtn) {
      setlikeBtn(false);
    } else {
      setlikeBtn(true);
    }
  };
  // console.log(listLikeduser);
  return (
    <Appcontext.Provider
      value={{
        search_user_click,
        setsearch_user_click,
        detailluserlogin,
        setdata_login_success,
        data_login_success,
        loading_detail,
        listLikeduser,
        btnlikeactive,
        handlerecallapi,
        likeBtn,
        followinguserlist,
        recallapi,
        setdetailluserlogin,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
}
export default ContexApi;
