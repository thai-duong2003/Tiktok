import * as httprequest from "~/utils/httprequest";

export const getaUser = async (path) => {
  try {
    const res = await httprequest.lay(`users/profile${path}`);
    return res.data[0];
  } catch (err) {}
};
