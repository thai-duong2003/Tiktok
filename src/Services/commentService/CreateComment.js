import { post } from "~/utils/httprequest";

export const CreateComment = async (content, userid, videoid) => {
  await post("comment/create", {
    content,
    userid,
    videoid,
  });
};
