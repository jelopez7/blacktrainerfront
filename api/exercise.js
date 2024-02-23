import { httpConToken } from "../helpers/http";

export async function getExerciseApi() {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::exercise.exercise?`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
