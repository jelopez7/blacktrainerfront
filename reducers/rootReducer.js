import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { courseReducer } from "./courseReducer";
import { trainingDayReducer } from "./trainingDayReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  trainingDay: trainingDayReducer,
});
