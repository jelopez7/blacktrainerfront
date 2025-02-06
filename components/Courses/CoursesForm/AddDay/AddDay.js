import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainingDay } from "@/actions/trainingDay";
import { size } from "lodash";

export default function AddDay({ setRenderComponent, data }) {
  const { width } = useWindowSize();

  const {
    status,
    error,
    data: trainingDays,
  } = useSelector((state) => state.trainingDay);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchTrainingDay(data.id));
  }, [dispatch]);

  return (
    <>
      {status === "succeeded" && (
        <RenderForm
          setRenderComponent={setRenderComponent}
          trainingDays={trainingDays}
          data={data}
        />
      )}

      <Grid className="contentCoursesDef" columns={getColumnsRender()}>
        <Grid.Row>
          <Grid.Column>
            <CoursesDescription course={data} />
          </Grid.Column>
          <Grid.Column>
            {status === "loading" && <div>Loading...</div>}

            {status === "failed" && <div>Error: {error}</div>}

            {status === "succeeded" && <TrainingDay />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

function RenderForm({ setRenderComponent, trainingDays, data }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      const formDataSend = {
        ...formData,
        position: size(trainingDays),
        course_id: data.id,
      };

      console.log(formDataSend);
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
