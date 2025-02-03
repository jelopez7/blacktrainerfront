import { createCourses, getCourses, updateCourse } from "@/api/course";
import { types } from "@/types/types";

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pendingCourse });

      const { results } = await getCourses();

      dispatch({ type: types.fulFilledCourse, payload: results });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedCourse });
    }
  };
};

export const addCourse = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pendingCourse });

      const data = await createCourses(formData);

      dispatch({ type: types.addCourse, payload: data });

      return data;
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedCourse });
      return null;
    }
  };
};

export const updatedCourse = (formData, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.pendingCourse });
      const data = await updateCourse(formData, id);

      dispatch({ type: types.updateCourse, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.rejectedCourse });
    }
  };
};
