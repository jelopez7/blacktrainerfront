import { types } from "@/types/types";

const initialState = {
  data: [],
  error: null,
  status: "idle",
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.pedingCategorie:
      return {
        ...state,
        status: "loading",
      };

    case types.fulFiledExercise:
      return {
        ...state,
        data: action.payload,
        status: "succeeded",
      };
    case types.rejectedExercise:
      return {
        ...state,
        status: "failed",
        error: action.error.message,
      };

    case types.addExercise:
      state.data.push(action.payload);
      return {
        ...state,
        status: "succeeded",
      };

    default:
      return state;
  }
};
