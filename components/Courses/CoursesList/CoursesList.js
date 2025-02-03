import React from "react";
import { Icon, Image, Rating } from "semantic-ui-react";
import { map, find } from "lodash";
import { levelOptions } from "../CoursesDescription/CoursesDescription.options";

export default function CoursesList({ courses, setRenderComponent }) {
  const handleCourses = (course) => {
    setRenderComponent({ key: "addDAy", data: course });
  };

  return (
    <div className="coursesList">
      <div className="content">
        {map(courses, (course, index) => (
          <div
            key={index}
            className="cardCourses"
            onClick={() => handleCourses(course)}
          >
            <Image
              className="imageCourse"
              src={
                course.photo
                  ? course.photo
                  : "https://cdn.fitnessonlineapp.com/uploads/ma/file/543/385a663203042b78.jpg"
              }
              alt="Blackfitness"
            />
            <div className="text-overlay">
              <h1 className="titleCourses">{course.name}</h1>

              <div>
                {course.training_for && (
                  <>
                    <Icon name="fire" /> <span>{course.categories[1]}</span>{" "}
                  </>
                )}
                {course.level && (
                  <>
                    <Rating
                      className="rating"
                      defaultRating={course.level}
                      maxRating={course.level}
                      icon="star"
                      disabled
                    />{" "}
                    <span>
                      {find(levelOptions, { key: course.level + "" }).text}
                    </span>
                  </>
                )}
              </div>

              {course.contents && (
                <p className="infoCourses">{course.contents[0]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
