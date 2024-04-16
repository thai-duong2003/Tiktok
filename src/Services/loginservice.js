import httprequest from "~/utils/httprequest";
export const login = async (email, password) => {
  try {
    const response = await httprequest.post("users/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {}
};
