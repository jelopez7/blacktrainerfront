import { useEffect, useState } from "react";
import CoursesForm from "@/components/Courses/CoursesForm";
import BasicLayout from "@/layouts/BasicLayouts";
import React from "react";
import AddDay from "@/components/Courses/CoursesForm/AddDay";
import CoursesList from "@/components/Courses/CoursesList";
import { getCourses } from "@/api/course";

export default function courses() {
  const [renderComponent, setRenderComponent] = useState("coursersForm");
  const [courses, setCoursesCompoenent] = useState(null);

  useEffect(() => {
    const getCoursesApi = async () => {
      const data = await getCourses();
      if (data) {
        setCoursesCompoenent(data.results);
      }
    };
    getCoursesApi();
  }, []);

  const selectedComponent = (key) => {
    if (key === "coursersForm") {
      return <CoursesForm setRenderComponent={setRenderComponent} />;
    }
    if (key === "addDAy") {
      return <AddDay setRenderComponent={setRenderComponent} />;
    }
  };

  return (
    <BasicLayout className="home">
      <h1>Editor de ejercicios</h1>

      {selectedComponent(renderComponent)}

      {courses ? <CoursesList courses={courses} /> : null}
    </BasicLayout>
  );
}
