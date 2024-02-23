import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { startLogin } from "../../../actions/auth";
import { useDispatch } from "react-redux";
import { Button, Form, Icon, Input } from "semantic-ui-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setIsLoading(true);
      await dispatch(startLogin(formData));
      setIsLoading(false);
    },
  });

  return (
    <div className="login-form">
      <h1>Black Fitness</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handleShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handleShowPassword} />
              )
            }
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
        </Form.Field>

        <Button type="submit" loading={isLoading}>
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
