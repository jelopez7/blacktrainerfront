import React from "react";
import { Button, Form, Grid, Input, TextArea } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ExerciseForm({
  setExerciseSelected,
  exerciseSelected,
}) {
  if (!exerciseSelected) {
    return null;
  }

  console.log(exerciseSelected.post_exercise_id.exercise_type);

  return (
    <div className="exerciseForm">
      <Form>
        <div className="content">
          <h1>{exerciseSelected.post_exercise_id.title}</h1>

          <Grid>
            {exerciseSelected.post_exercise_id.exercise_type === "cardio" && (
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Minutos</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Introduce los minutos"
                  />
                </Form.Field>
              </Grid.Column>
            )}
            <Grid.Column width={8}>
              <Form.Field>
                <label>Series</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Introduce las series"
                />
              </Form.Field>
            </Grid.Column>
            {exerciseSelected.post_exercise_id.exercise_type ===
              "functional_seconds" && (
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Segundos</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Introduce los segundos"
                  />
                </Form.Field>
              </Grid.Column>
            )}
            {(exerciseSelected.post_exercise_id.exercise_type === "power" ||
              exerciseSelected.post_exercise_id.exercise_type ===
                "functional_repeats") && (
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Repeticiones</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Introduce las repeticiones"
                  />
                </Form.Field>
              </Grid.Column>
            )}
          </Grid>
          {exerciseSelected.post_exercise_id.exercise_type === "cardio" && (
            <Grid>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Pulso min</label>
                  <Input type="text" name="name" placeholder="Ipm" />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Pulso máx</label>
                  <Input type="text" name="name" placeholder="Ipm" />
                </Form.Field>
              </Grid.Column>
            </Grid>
          )}
          <Grid>
            {exerciseSelected.post_exercise_id.exercise_type === "power" && (
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Establecer peso (KG)</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Introduce el peso"
                  />
                </Form.Field>
              </Grid.Column>
            )}

            <Grid.Column width={8}>
              <Form.Field>
                <label>comentario</label>
                <TextArea
                  name="name"
                  placeholder="Introduce algun comentario"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Button type="submit" inverted color="blue">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}
