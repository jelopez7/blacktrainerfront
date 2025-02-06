import { httpConToken } from "@/helpers/http";

export async function getCategorie() {
  try {
    const { data } = await httpConToken.get(
      "/content-manager/collection-types/api::categorie.categorie?pageSize=100&sort=title:ASC"
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
