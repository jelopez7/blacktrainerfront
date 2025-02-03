import { httpConToken } from "../helpers/http";

export async function getCourses() {
  try {
    const { data } = await httpConToken.get(
      `/content-manager/collection-types/api::course.course?pageSize=100&sort=name:ASC`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createCourses(formData) {
  try {
    const { data } = await httpConToken.post(
      `/content-manager/collection-types/api::course.course`,
      formData
    );
    await httpConToken.post(
      `/content-manager/collection-types/api::course.course/${data.id}/actions/publish`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCourse(formData, id) {
  try {
    const { data } = await httpConToken.put(
      `http://localhost:1337/content-manager/collection-types/api::course.course/${id}`,
      formData
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
