import { httpConToken } from "../helpers/http";

export async function getRoutines(id, date) {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::routine.routine?ffilters[date][$eq]=${date}&filters[$and][0][user][id][$eq]=${id}&populate[exercises][populate][image]`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
