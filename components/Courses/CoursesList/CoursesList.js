import React from "react";
import { Icon, Image, Rating } from "semantic-ui-react";
import { map } from "lodash";

export default function CoursesList({ courses }) {
  return (
    <div className="coursesList">
      <div className="content">
        {map(courses, (courses, index) => (
          <div key={index} className="cardCourses">
            <Image
              className="imageCourse"
              src={
                courses.photo
                  ? courses.photo
                  : "https://cdn.fitnessonlineapp.com/uploads/ma/file/543/385a663203042b78.jpg"
              }
              alt="Blackfitness"
            />
            <div className="text-overlay">
              <h1 className="titleCourses">{courses.name}</h1>
              <div>
                <Icon name="fire" /> <span>{courses.categories[1]}</span>{" "}
                <Rating
                  className="rating"
                  defaultRating={3}
                  maxRating={5}
                  icon="star"
                  disabled
                />{" "}
                <span>{courses.categories[2]}</span>
              </div>
              <p className="infoCourses">{courses.contents[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
