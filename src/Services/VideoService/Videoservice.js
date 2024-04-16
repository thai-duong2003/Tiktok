import { lay } from "~/utils/httprequest";

export const Video = async ({ page }) => {
  try {
    const res = await lay("videos", {
      params: { page },
    });
    return res.data;
  } catch (err) {}
};

export const FollowingVideoList = async ({ userId, page }) => {
  try {
    const res = await lay("me/following/videos", {
      params: { userId, page },
    });
    return res;
  } catch (err) {}
};
export const FriendVideoList = async ({ userId, page }) => {
  try {
    const res = await lay("me/friends/videos", {
      params: { userId, page },
    });
    return res;
  } catch (err) {}
};
