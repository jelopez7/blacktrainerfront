import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { courseReducer } from "./courseReducer";
import { trainingDayReducer } from "./trainingDayReducer";
import { categorieReducer } from "./categorieReducer";
import { postExerciseReducer } from "./postExerciseReducer";
import { exerciseReducer } from "./exerciseReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  trainingDay: trainingDayReducer,
  categorie: categorieReducer,
  postExercise: postExerciseReducer,
  exercise: exerciseReducer,
});
