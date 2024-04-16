import httprequest from "~/utils/httprequest";
export const Uploadservice = async (
  description,
  file_url,
  user_id,
  thumnailvideosecond,
  music
) => {
  try {
    const response = await httprequest.post(
      "videos/create",
      {
        description,
        file_url,
        user_id,
        thumnailvideosecond,
        music,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "response-type": "blob",
        },
      }
    );
    return response.data;
  } catch (er) {}
};
