import React from "react";
import { Icon, Image, Rating } from "semantic-ui-react";
import { map } from "lodash";

export default function CoursesList({ courses, setRenderComponent }) {
  const handleCourses = (course) => {
    setRenderComponent("addDAy", course);
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
              {course.categories && (
                <div>
                  <Icon name="fire" /> <span>{course.categories[1]}</span>{" "}
                  <Rating
                    className="rating"
                    defaultRating={3}
                    maxRating={5}
                    icon="star"
                    disabled
                  />{" "}
                  <span>{course.categories[2]}</span>
                </div>
              )}

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
