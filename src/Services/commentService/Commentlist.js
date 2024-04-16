import * as httprequest from "~/utils/httprequest";

export const Getcomment = async (idvideo) => {
  try {
    const resuilt = await httprequest.lay(`comment`, {
      params: { video_id: idvideo },
    });
    return resuilt;
  } catch (err) {}
};
