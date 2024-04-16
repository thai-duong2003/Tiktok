// import * as httprequest from "~/utils/httprequest";
import { lay } from "~/utils/httprequest";
export const Suggest = async ({ page, perpage }) => {
  try {
    const res = await lay("suggess/users", {
      params: { page },
    });
    return res;
  } catch (err) {}
};
