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

export default function AddDay({ setRenderComponent, data }) {
  console.log(data);

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
      <div className="addDay animate__animated animate__bounce">
        <Form>
          <div className="content">
            <div
              className="back"
              onClick={() => setRenderComponent("coursersForm")}
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
              />
            </Form.Field>

            <Button type="submit" inverted color="green">
              Guardar
            </Button>
          </div>
        </Form>
      </div>

      <Grid className="contentCoursesDef" columns={getColumnsRender()}>
        <Grid.Row>
          <Grid.Column>
            <CoursesDescription />
          </Grid.Column>
          <Grid.Column>
            <TrainingDay />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
