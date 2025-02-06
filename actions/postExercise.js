import { getpostExercise } from "@/api/postExercise";
import { types } from "@/types/types";

export const fetchPostExercise = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pedingPostExercise });

      const { results } = await getpostExercise();

      dispatch({ type: types.fulfilledPostExercise, payload: results });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedPostExercise });
    }
  };
};
