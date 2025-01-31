import React from "react";
import { Input, Form, Button } from "semantic-ui-react";

export default function AddDay() {
  return (
    <div className="addDay animate__animated animate__bounce">
      <Form>
        <div className="content">
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
  );
}
