import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import { setToken } from "../services/auth";
import Navbar from "../components/navbar";
import Button from "@material-ui/core/Button";
import Input from "../components/input";
import api from "../services/api";

const Login = () => {
  const loginFormRef = useRef();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async data => {
    await api
      .post("/oauth/token", {
        email: data.login,
        password: data.password,
      })
      .then(response => {
        console.log(response.data);
        setToken(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        <h1>Login</h1>

        <Form className="pg-form" ref={loginFormRef} onSubmit={loginHandler}>
          <Input
            value={login}
            onChange={e => {
              setLogin(e.target.value);
            }}
            helperText=""
            autoComplete="email"
            name="login"
            label="Login"
          />

          <Input
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            helperText=""
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
