import React from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";

export default function Exercise({ setRenderComponent, data }) {
  return (
    <div className="exercise animate__animated animate__bounce">
      <Form>
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
  );
}
