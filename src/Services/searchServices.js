import * as httprequest from "~/utils/httprequest";
export const Searchuser = async (q, typevl, page) => {
  try {
    const res = await httprequest.lay(`users/search`, {
      params: { q, type: typevl, page },
    });
    return res;
  } catch (err) {}
};

export const SearchVideo = async (q, page) => {
  try {
    const resuilt = await httprequest.lay("search/videos", {
      params: { q, page },
    });
    return resuilt;
  } catch (err) {}
};
