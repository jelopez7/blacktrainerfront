import { httpConToken } from "../helpers/http";

export async function getGroups() {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::group.group?populate=*`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
