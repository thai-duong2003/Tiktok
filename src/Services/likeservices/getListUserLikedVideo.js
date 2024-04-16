import * as httprequest from "~/utils/httprequest";

export const getListUserLikedVideo = async (userId) => {
  try {
    const resuilt = await httprequest.lay(
      "like/current-user-liked-video-list",
      {
        params: {
          user_id: userId,
        },
      }
    );
    return resuilt;
  } catch (err) {}
};
