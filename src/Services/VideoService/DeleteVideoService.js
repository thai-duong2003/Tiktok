const { deleteData } = require("~/utils/httprequest");

export const DeleteVideosevice = async (idvideo, iduser) => {
  try {
    deleteData("/delete/video", {
      params: {
        idvideo,
        iduser,
      },
    });
  } catch (er) {}
};
