import { createTrainingDay, getTrainingDay } from "@/api/trainingDay";
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

export const addTrainingDay = (formData) => {
  return async (dispatch) => {
    try {
      const data = await createTrainingDay(formData);

      dispatch({ type: types.addTrainingDay, payload: data });

      return data;
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedTrainingDay });
    }
  };
};
