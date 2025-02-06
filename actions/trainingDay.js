import { getTrainingDay } from "@/api/trainingDay";
import { types } from "@/types/types";

export const fetchTrainingDay = (course_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pendignTrainingDay });

      const { results } = await getTrainingDay(course_id);

      dispatch({ type: types.fulFilledTrainingDay, payload: results });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedTrainingDay });
    }
  };
};
