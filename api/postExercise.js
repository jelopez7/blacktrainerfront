import { httpConToken } from "@/helpers/http";

export async function getpostExercise() {
  try {
    const { data } = await httpConToken.get(
      "/content-manager/collection-types/api::post-exercise.post-exercise?pageSize=1000&sort=title:ASC"
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
