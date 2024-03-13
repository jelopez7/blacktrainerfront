import { httpConToken, httpSinToken } from "../helpers/http";

export async function getExerciseApi() {
  try {
    const { data } = await httpSinToken.get(
      `/api/exercises?populate[group][populate][image]=*&populate[image]=*`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
