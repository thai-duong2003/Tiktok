import * as httprequest from "~/utils/httprequest";

export const FollowingList = async (userId) => {
  try {
    const resuilt = await httprequest.lay("me/following", {
      params: {
        userId,
      },
    });

    return resuilt;
  } catch (err) {}
};

export const FollowerList = async (userId) => {
  try {
    const resuilt = await httprequest.lay("me/follower", {
      params: {
        userId,
      },
    });

    return resuilt;
  } catch (err) {}
};

export const friendsList = async (userId) => {
  try {
    const resuilt = await httprequest.lay("me/friends", {
      params: {
        userId,
      },
    });

    return resuilt;
  } catch (err) {}
};

export const followAndUnfollow = async (userID, followingUserId) => {
  try {
    const resuilt = await httprequest.post("me/following", {
      userID,
      followingUserId,
    });
  } catch (err) {}
};
