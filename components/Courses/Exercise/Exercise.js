import { addExercise, fetchExercise } from "@/actions/exercise";
import useWindowSize from "@/hooks/useWindowSize";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
  breakpointUpXl,
} from "@/utils/breakpoints";
import { useFormik } from "formik";
import { filter, find, map, size } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Grid, Icon, Input } from "semantic-ui-react";
import * as Yup from "yup";
import ExerciseList from "../ExerciseList";

export default function Exercise({ setRenderComponent, data }) {
  const { data: dataCategorie } = useSelector((state) => state.categorie);
  const { data: postExercise } = useSelector((state) => state.postExercise);
  const { data: dataExercise, status } = useSelector((state) => state.exercise);

  const dispatch = useDispatch();

  const [categorieSelected, setCategorieSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [exerciseDrop, setExerciseDrop] = useState([]);

  const categorieDropDown = () => {
    const categorieFilter = filter(dataCategorie, {
      post_type: "post_exercise",
    });

    const categorieDrop = map(categorieFilter, (item) => ({
      key: item.id,
      value: item.id,
      text: item.title,
      image: item.photo.url,
    }));

    return categorieDrop;
  };

  const handleCategorie = (data) => {
    const exerciseFilter = filter(postExercise, { category_id: data.value });

    setExerciseDrop(
      map(exerciseFilter, (item) => ({
        key: item.id,
        value: item.id,
        text: item.title,
        image: item.photo,
      }))
    );
    setCategorieSelected(true);
  };

  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpXl:
        return 2;
      case width > breakpointUpLg:
        return 2;
      case width > breakpointUpMd:
        return 1;
      case width > breakpointUpSm:
        return 1;
      default:
        return 2;
    }
  };

  const formik = useFormik({
    initialValues: { post_exercise_id: "" },
    validationSchema: Yup.object({
      post_exercise_id: Yup.string().required(true),
    }),
    onSubmit: async (formData) => {
      setIsLoading(true);
      const exerciseSelected = find(postExercise, {
        id: formData.post_exercise_id,
      });

      const formDataSend = {
        ...formData,
        position: size(dataExercise),
        training_day_id: data.id,
        exerciseSelected,
      };

      await dispatch(addExercise(formDataSend));

      setIsLoading(false);

      formik.setFieldValue("post_exercise_id", "");
    },
  });

  useEffect(() => {
    dispatch(fetchExercise(data.id));
  }, [dispatch]);

  return (
    <div className="exercise animate__animated animate__bounce">
      <Form onSubmit={formik.handleSubmit}>
        {categorieSelected ? (
          <div className="content">
            <div className="back" onClick={() => setCategorieSelected(null)}>
              <Icon name="arrow circle left" color="teal" link size="large" />
            </div>
            <Form.Field>
              <label>Nombre del ejercicio</label>
              <Dropdown
                placeholder="Seleccion el ejercicio"
                fluid
                search
                selection
                options={exerciseDrop}
                value={formik.values.post_exercise_id}
                error={formik.errors.post_exercise_id}
                onChange={(_, data) =>
                  formik.setFieldValue("post_exercise_id", data.value)
                }
                className="exerciseDropdown"
              />
            </Form.Field>
            <Button loading={isLoading} type="submit" inverted color="green">
              Guardar
            </Button>
          </div>
        ) : (
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
              <label>Nombre del musculo</label>
              <Dropdown
                placeholder="Selecciona la categoria"
                fluid
                search
                selection
                options={categorieDropDown()}
                onChange={(_, data) => handleCategorie(data)}
                className="exerciseDropdown"
              />
            </Form.Field>
          </div>
        )}
      </Form>

      {status === "loading" ? (
        <div>Cargando ejercicios </div>
      ) : (
        <Grid className="contentExerciseDef">
          <Grid.Row columns={getColumnsRender()}>
            <Grid.Column>
              <ExerciseList />
            </Grid.Column>
            <Grid.Column>Form</Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
}
