import { useEffect, useState } from "react";
import CoursesForm from "@/components/Courses/CoursesForm";
import BasicLayout from "@/layouts/BasicLayouts";
import React from "react";
import AddDay from "@/components/Courses/CoursesForm/AddDay";
import CoursesList from "@/components/Courses/CoursesList";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "@/actions/course";

export default function courses() {
  const [renderComponent, setRenderComponent] = useState({
    key: "coursersForm",
    data: null,
  });

  const { status, error } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const selectedComponent = ({ key, data }) => {
    if (key === "coursersForm") {
      return <CoursesForm setRenderComponent={setRenderComponent} />;
    }
    if (key === "addDAy") {
      return <AddDay setRenderComponent={setRenderComponent} data={data} />;
    }
  };

  return (
    <BasicLayout className="home">
      <h1>Editor de ejercicios</h1>

      {selectedComponent(renderComponent)}

      {status === "loading" && <div>Loading...</div>}

      {status === "failed" && <div>Error: {error}</div>}

      {renderComponent.key === "coursersForm" && status === "succeeded" ? (
        <CoursesList setRenderComponent={setRenderComponent} />
      ) : null}
    </BasicLayout>
  );
}
