import axios from "axios";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

const USERS_API = "/api/users";

export const findUserById = async (id: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return data;
};
