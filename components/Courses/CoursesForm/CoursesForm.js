import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "animate.css";
import { createCourses } from "@/api/course";

export default function CoursesForm({ setRenderComponent }) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setIsLoading(true);
      const response = await createCourses(formData);
      setIsLoading(false);
      if (response) {
        setRenderComponent("addDAy", response);
      }
    },
  });
  return (
    <div className="courseForm animate__animated animate__bounce">
      <Form onSubmit={formik.handleSubmit}>
        <div className="content">
          <Form.Field>
            <label>Titulo</label>
            <Input
              type="text"
              name="name"
              placeholder=""
              icon="sign language"
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
          </Form.Field>

          <Button loading={isLoading} type="submit" inverted color="green">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    name: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
  };
}
