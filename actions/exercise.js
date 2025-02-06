import { createExercise, getExercise } from "@/api/exercise";
import { types } from "@/types/types";

export const fetchExercise = (trainingDay_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pedingExercise });

      const { results } = await getExercise(trainingDay_id);

      dispatch({ type: types.fulFiledExercise, payload: results });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedExercise, error: error });
    }
  };
};

export const addExercise = (formData) => {
  return async (dispatch) => {
    try {
      const data = await createExercise(formData);

      console.log(data);

      dispatch({ type: types.addExercise, payload: data });

      return data;
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedExercise });
    }
  };
};
