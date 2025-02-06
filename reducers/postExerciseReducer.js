import { types } from "@/types/types";

const initialState = {
  data: [],
  error: null,
  status: "idle",
};

export const postExerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.pedingPostExercise:
      return {
        ...state,
        status: "loading",
      };
    case types.fulfilledPostExercise:
      return {
        ...state,
        status: "succeeded",
        data: action.payload,
      };
    case types.rejectedPostExercise:
      return {
        ...state,
        status: "failed",
        error: action.error.message,
      };

    default:
      return state;
  }
};
