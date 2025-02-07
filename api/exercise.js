import { httpConToken } from "../helpers/http";

export async function getExercise(trainingDay_id) {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::exercise.exercise?pageSize=100&sort=position:ASC&filters[$and][0][training_day_id][id][$eq]=${trainingDay_id}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createExercise(formData) {
  try {
    const { data } = await httpConToken.post(
      `/content-manager/collection-types/api::exercise.exercise`,
      formData
    );

    await httpConToken.post(
      `/content-manager/collection-types/api::exercise.exercise/${data.id}/actions/publish`
    );

    return {
      ...data,
      post_exercise_id: formData.exerciseSelected,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
