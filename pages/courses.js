import { useEffect, useState } from "react";
import CoursesForm from "@/components/Courses/CoursesForm";
import BasicLayout from "@/layouts/BasicLayouts";
import React from "react";
import AddDay from "@/components/Courses/CoursesForm/AddDay";
import CoursesList from "@/components/Courses/CoursesList";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "@/actions/course";
import Exercise from "@/components/Courses/Exercise";
import { fetchCategorie } from "@/actions/categorie";
import { fetchPostExercise } from "@/actions/postExercise";
import { useRouter } from "next/router";

export default function courses() {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      router.push("/auth"); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const [renderComponent, setRenderComponent] = useState({
    key: "coursersForm",
    data: null,
  });

  const { status, error } = useSelector((state) => state.course);
  const { status: statusCategorie, error: errorCategorie } = useSelector(
    (state) => state.categorie
  );

  const { status: statusPostExercise, error: errorPostExercise } = useSelector(
    (state) => state.postExercise
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategorie());
    dispatch(fetchPostExercise());
  }, [dispatch]);

  const selectedComponent = ({ key, data }) => {
    if (key === "coursersForm") {
      return <CoursesForm setRenderComponent={setRenderComponent} />;
    }
    if (key === "addDAy") {
      return <AddDay setRenderComponent={setRenderComponent} data={data} />;
    }
    if (key === "exercise") {
      return <Exercise setRenderComponent={setRenderComponent} data={data} />;
    }
  };

  return (
    <BasicLayout className="home">
      <h1>Editor de ejercicios</h1>

      {selectedComponent(renderComponent)}

      {status === "loading" && <div>Loading...</div>}

      {status === "failed" ||
        errorCategorie ||
        (errorPostExercise && <div>Error: {error}</div>)}

      {renderComponent.key === "coursersForm" &&
      (status === "succeeded" ||
        statusCategorie === "succeeded" ||
        statusPostExercise === "succeeded") ? (
        <CoursesList setRenderComponent={setRenderComponent} />
      ) : null}
    </BasicLayout>
  );
}
