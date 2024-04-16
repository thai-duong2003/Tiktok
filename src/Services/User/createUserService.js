import httprequest from "~/utils/httprequest";
export const CreateUser = async (email, password, name, nickname, avatar) => {
  try {
    const resuilt = await httprequest.post(
      "users/register",
      {
        email,
        password,
        name,
        nickname,
        avatar,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "response-type": "blob",
        },
      }
    );
    return resuilt;
  } catch {}
};
export const Updateaccount = async (id, name, nickname, avatar, bio) => {
  const resuilt = await httprequest.post(
    `users/update/${id}`,
    {
      name,
      nickname,
      avatar,
      bio,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "response-type": "blob",
      },
    }
  );
  // return resuilt
};
