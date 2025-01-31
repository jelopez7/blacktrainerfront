import { httpConToken } from "../helpers/http";

export async function getCourses() {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::course.course?pageSize=100&sort=name:ASC`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
