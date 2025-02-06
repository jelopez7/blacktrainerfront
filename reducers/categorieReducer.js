import { types } from "@/types/types";

const initialState = {
  data: [],
  errot: null,
  status: "idle",
};

export const categorieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.pedingCategorie:
      return {
        ...state,
        status: "loading",
      };
    case types.fulFilledCategorie:
      return {
        ...state,
        status: "succeeded",
        data: action.payload,
      };
    case types.rejectedCategorie:
      return {
        ...state,
        status: "failed",
        error: action.error.message,
      };

    default:
      return state;
  }
};
