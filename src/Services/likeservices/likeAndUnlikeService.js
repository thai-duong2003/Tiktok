import { post } from "~/utils/httprequest";

export const LikeAndUnlike = async (userID, videoID) => {
  try {
    await post("like", {
      // la post thif ko canf them chu params
      userID,
      videoID,
    });
  } catch (err) {}
};
