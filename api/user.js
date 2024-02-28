import { httpConToken } from "../helpers/http";

export async function getUsersApi() {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/plugin::users-permissions.user`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
