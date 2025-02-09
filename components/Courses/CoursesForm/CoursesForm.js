import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "@/actions/course";
import { useRouter } from "next/router";

export default function CoursesForm({ setRenderComponent }) {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      router.push("/auth"); // Redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, router]);

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.course);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      const result = await dispatch(addCourse(formData));

      if (result) {
        setRenderComponent({ key: "addDAy", data: result });
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

          <Button
            loading={status === "loading"}
            type="submit"
            inverted
            color="green"
          >
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
