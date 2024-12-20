import { httpConToken } from "../helpers/http";

export async function getRoutines(id) {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::routine.routine?filters[$and][0][user][id][$eq]=${id}&populate[exercise][populate][image]&pageSize=100`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setRoutineApi(formValue) {
  try {
    const { data } = await httpConToken.post(
      "/content-manager/collection-types/api::routine.routine",
      formValue
    );
    await httpConToken.post(
      `/content-manager/collection-types/api::routine.routine/${data.id}/actions/publish`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteRoutineApi(idRoutine) {
  try {
    const { data } = await httpConToken.delete(
      `/content-manager/collection-types/api::routine.routine/${idRoutine}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
