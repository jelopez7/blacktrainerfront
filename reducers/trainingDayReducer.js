import { types } from "../types/types";

const initialState = {
  data: [],
  error: null,
  status: "idle",
};

export const trainingDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.pendignTrainingDay:
      return {
        ...state,
        status: "loading",
      };
    case types.fulFilledTrainingDay:
      return {
        ...state,
        status: "succeeded",
        data: action.payload,
      };
    case types.rejectedTrainingDay:
      return {
        ...state,
        status: "failed",
        error: action.error.message,
      };
    case types.addTrainingDay:
      state.data.push(action.payload);

      return {
        ...state,
        status: "succeeded",
      };

    case types.deleteTrainingDay:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
