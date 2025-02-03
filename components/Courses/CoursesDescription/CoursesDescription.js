import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Input,
  TextArea,
} from "semantic-ui-react";
import {
  categoriesOptions,
  contensOption,
  frequencyOptions,
  genderOptions,
  levelOptions,
  trainingForOptions,
} from "./CoursesDescription.options";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatedCourse } from "@/actions/course";

export default function CoursesDescription({ course }) {
  const { status } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues(course),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      dispatch(updatedCourse(formData, course.id));
    },
  });

  return (
    <div className="coursesDescription">
      <Form onSubmit={formik.handleSubmit}>
        <div className="content">
          <Form.Field>
            <label>Nombre Template</label>
            <Input
              type="text"
              name="name"
              defaultValue={formik.values.name}
              placeholder="Inserte el nombre del template"
              icon="sign language"
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Descripcion</label>
            <TextArea
              name="description"
              onChange={formik.handleChange}
              defaultValue={formik.values.description}
              error={formik.errors.description}
            />
          </Form.Field>

          <Grid>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Template para</label>
                <Dropdown
                  placeholder="Selecciona el modo"
                  fluid
                  selection
                  defaultValue={formik.values.training_for}
                  onChange={(_, data) =>
                    formik.setFieldValue("training_for", data.value)
                  }
                  options={trainingForOptions}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Genero</label>
                <Dropdown
                  placeholder="Selecciona el genero"
                  fluid
                  selection
                  defaultValue={formik.values.gender}
                  options={genderOptions}
                  onChange={(_, data) =>
                    formik.setFieldValue("gender", data.value)
                  }
                />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Frecuencia</label>
                <Dropdown
                  placeholder="Selecciona la frecuencia"
                  fluid
                  selection
                  defaultValue={formik.values.frequency}
                  options={frequencyOptions}
                  onChange={(_, data) =>
                    formik.setFieldValue("frequency", data.value)
                  }
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Categoria</label>
                <Dropdown
                  placeholder="Selecciona las categorias"
                  fluid
                  selection
                  multiple
                  defaultValue={formik.values.categories}
                  options={categoriesOptions}
                  onChange={(_, data) =>
                    formik.setFieldValue("categories", data.value)
                  }
                />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={8}>
              <Form.Field>
                <label>Contenidos</label>
                <Dropdown
                  placeholder="Selecciona los contenidos"
                  fluid
                  selection
                  multiple
                  defaultValue={formik.values.contents}
                  options={contensOption}
                  onChange={(_, data) =>
                    formik.setFieldValue("contents", data.value)
                  }
                />
              </Form.Field>
            </Grid.Column>

            <Grid.Column width={8}>
              <Form.Field>
                <label>Nivel</label>
                <Dropdown
                  placeholder="Selecciona el nivel"
                  fluid
                  selection
                  defaultValue={formik.values.level + ""}
                  options={levelOptions}
                  onChange={(_, data) =>
                    formik.setFieldValue("level", data.value)
                  }
                />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Form.Field className="image">
            <label htmlFor="file" className="custum-file-upload">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      fill=""
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="text">
                <span>Click para cargar la imagen</span>
              </div>
              <input id="file" type="file" />
            </label>
          </Form.Field>

          <Button
            loading={status === "loading"}
            type="submit"
            inverted
            color="blue"
          >
            Editar
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues(course) {
  return {
    name: course.name,
    description: course.description,
    frequency: course.frequency,
    gender: course.gender,
    training_for: course.training_for,
    categories: course.categories,
    contents: course.contents,
    level: course.level,
    photo: course.photo,
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
  };
}
