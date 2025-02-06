import { httpConToken } from "@/helpers/http";

export async function createTrainingDay(formData) {
  try {
    const { data } = await httpConToken.post(
      `/content-manager/collection-types/api::training-day.training-day`,
      formData
    );
    await httpConToken.post(
      `/content-manager/collection-types/api::training-day.training-day/${data.id}/actions/publish`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTrainingDay(course_id) {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::training-day.training-day?pageSize=100&sort=position:ASC&filters[$and][0][course_id][id][$eq]=${course_id}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateTrainingDays(trainingDays) {
  try {
    const promises = trainingDays.map(async (item) => {
      const { data } = await httpConToken.put(
        `/content-manager/collection-types/api::training-day.training-day/${item.id}`,
        item
      );
      return data;
    });

    // Esperar a que todas las promesas se resuelvan
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error al obtener los días de entrenamiento:", error);
    return null;
  }
}
