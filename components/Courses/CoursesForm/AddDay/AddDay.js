import React from "react";
import { Input, Form, Button, Icon, Grid } from "semantic-ui-react";
import TrainingDay from "../../TrainingDay";
import CoursesDescription from "../../CoursesDescription";
import useWindowSize from "@/hooks/useWindowSize";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
  breakpointUpXl,
} from "@/utils/breakpoints";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddDay({ setRenderComponent, data }) {
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpXl:
        return 2;
      case width > breakpointUpLg:
        return 2;
      case width > breakpointUpMd:
        return 2;
      case width > breakpointUpSm:
        return 1;
      default:
        return 2;
    }
  };

  return (
    <>
      <RenderForm setRenderComponent={setRenderComponent} />

      <Grid className="contentCoursesDef" columns={getColumnsRender()}>
        <Grid.Row>
          <Grid.Column>
            <CoursesDescription course={data} />
          </Grid.Column>
          <Grid.Column>
            <TrainingDay />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

function RenderForm({ setRenderComponent }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData);
    },
  });
  return (
    <div className="addDay animate__animated animate__bounce">
      <Form onSubmit={formik.handleSubmit}>
        <div className="content">
          <div
            className="back"
            onClick={() =>
              setRenderComponent({ key: "coursersForm", data: null })
            }
          >
            <Icon name="arrow circle left" color="teal" link size="large" />
          </div>

          <Form.Field>
            <label>Nombre del entrenamiento</label>
            <Input
              type="text"
              name="title"
              placeholder=""
              icon="pencil alternate"
              onChange={formik.handleChange}
              error={formik.errors.title}
            />
          </Form.Field>

          <Button type="submit" inverted color="green">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    title: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
  };
}
