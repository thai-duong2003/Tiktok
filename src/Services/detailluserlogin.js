import httprequest from "~/utils/httprequest";
export const detailuser = async (token) => {
  try {
    const response = await httprequest.post(
      "users/details",
      {
        //parrams
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {}
};
