import { httpConToken } from "../helpers/http";

export async function getTypes() {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::type.type`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
