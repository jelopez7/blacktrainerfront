import { types } from "../types/types";

const initialState = {
  data: [],
  error: null,
  status: "idle",
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.pendingCourse:
      return {
        ...state,
        status: "loading",
      };
    case types.fulFilledCourse:
      return {
        ...state,
        status: "succeeded",
        data: action.payload,
      };
    case types.rejectedCourse:
      return {
        ...state,
        status: "failed",
        error: action.error.message,
      };
    case types.addCourse:
      state.data.push(action.payload);

      return {
        ...state,
        status: "succeeded",
      };

    case types.deleteCourse:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };

    case types.updateCourse:
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      return {
        ...state,
        status: "succeeded",
      };

    default:
      return state;
  }
};
