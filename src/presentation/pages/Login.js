import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import Button from "@material-ui/core/Button";
import Input from "../../components/input";

const Login = ({ loginClient }) => {
  const loginFormRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const loginHandler = async data => {
    await loginClient
      .login(data.email, data.password)
      .then(response => {
        setErrors({});
        history.push("/");
      })
      .catch(error => {
        if (error.data.message) {
          setErrors({ ...errors, email: error.data.message, password: " " });
        }
      });
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        <h1>Entrar</h1>

        <Form className="pg-form" ref={loginFormRef} onSubmit={loginHandler}>
          <Input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrors({});
            }}
            error={!!errors["email"]}
            helperText={errors["email"] || ""}
            autoComplete="email"
            name="email"
            label="Email"
          />

          <Input
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setErrors({});
            }}
            error={!!errors["password"]}
            helperText={errors["password"] || ""}
            autoComplete="password"
            name="password"
            label="Senha"
            type="password"
          />

          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
